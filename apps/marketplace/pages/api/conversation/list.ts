import { redis } from '@server/redis'
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

  // 최신순 정렬
  const filtered = [...conversations].sort(
    (a, b) => b.last_message_at - a.last_message_at,
  )

  res.status(200).json({
    code: 'SUCCESS',
    message: '대화 목록 조회 성공',
    data: {
      conversations: filtered,
    },
  })
}
