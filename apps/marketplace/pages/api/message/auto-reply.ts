import { pusher } from '@server/pusher'
import { redis } from '@server/redis'
import { Conversation, Message } from '@server/types'
import { NextApiRequest, NextApiResponse } from 'next'

interface NewProductParams {
  partner: string
  product_id: string
  content: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const rawConversations = await redis.get('conversations')
  const conversations =
    rawConversations && (JSON.parse(rawConversations) as Conversation[])

  const rawMessages = await redis.get('messages')
  const messages = rawMessages && (JSON.parse(rawMessages) as Message[])

  if (!conversations || !messages) {
    return res.status(400).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: '서버 오류가 발생했습니다.',
      data: null,
    })
  }

  if (req.method === 'POST') {
    const { partner, product_id, content } =
      req.body as unknown as NewProductParams

    if (!partner || !product_id || !content) {
      return res.status(400).json({
        code: 'BAD_REQUEST',
        message: '필수 파라미터가 누락되었습니다.',
        data: null,
      })
    }

    const now = Number(Date.now())

    const existingConversation = conversations.find(
      conversation =>
        conversation.product_id === product_id &&
        conversation.partner === partner,
    )

    if (!existingConversation) {
      return res.status(400).json({
        code: 'BAD_REQUEST',
        message: '존재하지 않는 대화입니다.',
        data: null,
      })
    }

    const replyContent = `"${content}"에 대한 자동 답변입니다.`

    const newMessage: Message = {
      message_id: `msg-${now}`,
      conversation_id: existingConversation.conversation_id,
      sender: partner,
      content: replyContent,
      created_at: now,
    }

    const newMessages = [...messages, newMessage]
    await redis.set('messages', JSON.stringify(newMessages))

    const newConversations: Conversation[] = conversations.map(c =>
      c.conversation_id === existingConversation.conversation_id
        ? {
            ...c,
            last_message: replyContent,
            last_message_at: now,
            has_new_message: true,
          }
        : c,
    )

    await redis.set('conversations', JSON.stringify(newConversations))
    await pusher.trigger('marketplace', 'new-message-count', {
      payload: newConversations.filter((c: Conversation) => c.has_new_message)
        .length,
    })
    await pusher.trigger('marketplace', 'auto-reply', {
      payload: replyContent,
    })

    return res.status(200).json({
      code: 'SUCCESS',
      message: '자동 답변 전송 성공',
      data: null,
    })
  }

  return res.status(405).json({
    code: 'METHOD_NOT_ALLOWED',
    message: 'Method Not Allowed',
    data: null,
  })
}
