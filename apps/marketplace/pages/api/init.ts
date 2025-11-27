import { pusher } from '@server/pusher'
import { redis } from '@server/redis'
import { Conversation } from '@server/types'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const rawConversations = await redis.get('conversations')
  const conversations = rawConversations && JSON.parse(rawConversations)

  if (!conversations) {
    return res.status(400).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: '서버 오류가 발생했습니다.',
      data: null,
    })
  }

  pusher.trigger('new-message-count', 'new-message-count', {
    payload: conversations.filter((c: Conversation) => c.has_new_message)
      .length,
  })

  res.status(200).json({
    code: 'SUCCESS',
    message: '초기화 성공',
    data: null,
  })
}
