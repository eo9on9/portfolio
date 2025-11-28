import { MY_NAME } from '@server/constants'
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

    const conversationId = existingConversation
      ? existingConversation.conversation_id
      : `conv-${now}`

    const newMessage: Message = {
      message_id: `msg-${now}`,
      conversation_id: conversationId,
      sender: MY_NAME,
      content,
      created_at: now,
    }

    const newMessages = [...messages, newMessage]
    await redis.set('messages', JSON.stringify(newMessages))

    let newConversations: Conversation[] = []

    if (existingConversation) {
      newConversations = conversations.map(c =>
        c.conversation_id === existingConversation.conversation_id
          ? {
              ...c,
              last_message: content,
              last_message_at: now,
              has_new_message: true,
            }
          : c,
      )
    } else {
      const newConversation: Conversation = {
        conversation_id: conversationId,
        partner,
        product_id,
        last_message: content,
        last_message_at: now,
        has_new_message: true,
      }
      newConversations = [...conversations, newConversation]
    }

    await redis.set('conversations', JSON.stringify(newConversations))
    await pusher.trigger('marketplace', 'new-message-count', {
      payload: newConversations.filter((c: Conversation) => c.has_new_message)
        .length,
    })

    const replyPromise = () =>
      new Promise(resolve => {
        setTimeout(async () => {
          const now = Number(Date.now())
          const replyContent = `"${content}"에 대한 자동 답변입니다.`
          await redis.set(
            'messages',
            JSON.stringify([
              ...newMessages,
              {
                message_id: `msg-${now}`,
                conversation_id: conversationId,
                sender: partner,
                content: replyContent,
                created_at: now,
              },
            ]),
          )
          const repliedNewConversations = newConversations.map(c =>
            c.conversation_id === conversationId
              ? {
                  ...c,
                  last_message: replyContent,
                  last_message_at: now,
                  has_new_message: true,
                }
              : c,
          )
          await redis.set(
            'conversations',
            JSON.stringify(repliedNewConversations),
          )
          pusher.trigger('marketplace', 'new-message-count', {
            payload: repliedNewConversations.filter(
              (c: Conversation) => c.has_new_message,
            ).length,
          })
          pusher.trigger('marketplace', 'auto-reply', {
            payload: replyContent,
          })
          resolve(true)
        }, 1000)
      })

    // await replyPromise()

    // setTimeout(async () => {
    //   const now = Number(Date.now())
    //   const replyContent = `"${content}"에 대한 자동 답변입니다.`
    //   await redis.set(
    //     'messages',
    //     JSON.stringify([
    //       ...newMessages,
    //       {
    //         message_id: `msg-${now}`,
    //         conversation_id: conversationId,
    //         sender: partner,
    //         content: replyContent,
    //         created_at: now,
    //       },
    //     ]),
    //   )
    //   const repliedNewConversations = newConversations.map(c =>
    //     c.conversation_id === conversationId
    //       ? {
    //           ...c,
    //           last_message: replyContent,
    //           last_message_at: now,
    //           has_new_message: true,
    //         }
    //       : c,
    //   )
    //   await redis.set('conversations', JSON.stringify(repliedNewConversations))
    //   pusher.trigger('marketplace', 'new-message-count', {
    //     payload: repliedNewConversations.filter(
    //       (c: Conversation) => c.has_new_message,
    //     ).length,
    //   })
    //   setTimeout(() => {
    //     pusher.trigger('marketplace', 'auto-reply', {
    //       payload: replyContent,
    //     })
    //   }, 100)
    // }, 1000)

    res.status(200).json({
      code: 'SUCCESS',
      message: '메시지 전송 성공',
      data: {
        messages: newMessages
          .filter(m => m.conversation_id === conversationId)
          .sort((a, b) => a.created_at - b.created_at),
      },
    })

    await replyPromise()
  }

  return res.status(405).json({
    code: 'METHOD_NOT_ALLOWED',
    message: 'Method Not Allowed',
    data: null,
  })
}
