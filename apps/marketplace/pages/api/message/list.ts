import { pusher } from '@server/pusher'
import { redis } from '@server/redis'
import { Conversation } from '@server/types'
import { NextApiRequest, NextApiResponse } from 'next'

interface FilterParams {
  conversation_id?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const rawConversations = await redis.get('conversations')
  const conversations = rawConversations && JSON.parse(rawConversations)

  const rawMessages = await redis.get('messages')
  const messages = rawMessages && JSON.parse(rawMessages)

  if (!messages || !conversations) {
    return res.status(400).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: '서버 오류가 발생했습니다.',
      data: null,
    })
  }

  if (req.method === 'GET') {
    const { conversation_id } = req.query as unknown as FilterParams

    if (!conversation_id) {
      return res.status(400).json({
        code: 'BAD_REQUEST',
        message: '필수 파라미터가 누락되었습니다.',
        data: null,
      })
    }

    // 오래된 순으로 정렬
    let filtered = [...messages].sort((a, b) => a.created_at - b.created_at)

    // 필터링
    filtered = filtered.filter(message => {
      if (conversation_id && message.conversation_id !== conversation_id)
        return false

      return true
    })

    const newConversations = conversations.map((conversation: Conversation) =>
      conversation.conversation_id === conversation_id
        ? { ...conversation, has_new_message: false }
        : conversation,
    )
    await redis.set('conversations', JSON.stringify(newConversations))
    await pusher.trigger('marketplace', 'new-message-count', {
      payload: newConversations.filter((c: Conversation) => c.has_new_message)
        .length,
    })

    return res.status(200).json({
      code: 'SUCCESS',
      message: '메시지 목록 조회 성공',
      data: {
        messages: filtered,
      },
    })
  }

  return res.status(405).json({
    code: 'METHOD_NOT_ALLOWED',
    message: 'Method Not Allowed',
    data: null,
  })
}
