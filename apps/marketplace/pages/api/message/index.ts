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

    const maxMessageId =
      messages.length > 0
        ? Math.max(
            ...messages.map(m => Number(m.message_id.replace('msg-', ''))),
          )
        : 0

    const maxConversationId =
      conversations.length > 0
        ? Math.max(
            ...conversations.map(c =>
              Number(c.conversation_id.replace('conv-', '')),
            ),
          )
        : 0

    const existingConversation = conversations.find(
      conversation =>
        conversation.product_id === product_id &&
        conversation.partner === partner,
    )

    const conversationId = existingConversation
      ? existingConversation.conversation_id
      : `conv-${maxConversationId + 1}`

    const now = Number(Date.now())

    const newMessage: Message = {
      message_id: `msg-${maxMessageId + 1}`,
      conversation_id: conversationId,
      sender: '용사(나)',
      content,
      created_at: now,
    }

    const newMessages = [...messages, newMessage]
    await redis.set('messages', JSON.stringify(newMessages))

    if (existingConversation) {
      const newConversations = conversations.map(c =>
        c.conversation_id === existingConversation.conversation_id
          ? {
              ...c,
              last_message: content,
              last_message_at: now,
              has_new_message: true,
            }
          : c,
      )
      await redis.set('conversations', JSON.stringify(newConversations))
    } else {
      const newConversation: Conversation = {
        conversation_id: newMessage.conversation_id,
        partner,
        product_id,
        last_message: content,
        last_message_at: now,
        has_new_message: true,
      }
      const newConversations = [...conversations, newConversation]
      await redis.set('conversations', JSON.stringify(newConversations))
    }

    res.status(200).json({
      code: 'SUCCESS',
      message: '메시지 전송 성공',
      data: {
        messages: newMessages
          .filter(m => m.conversation_id === conversationId)
          .sort((a, b) => a.created_at - b.created_at),
      },
    })
  }

  return res.status(405).json({
    code: 'METHOD_NOT_ALLOWED',
    message: 'Method Not Allowed',
    data: null,
  })
}
