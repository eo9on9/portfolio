import { getRedis } from '@server/redis'
import { requireAuth } from '@server/requireAuth'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const redis = await getRedis()

  // ==================================================
  // 인증 및 유저 확인
  // ==================================================
  const user = await requireAuth(req, res)

  if (!user) return

  // ==================================================
  // GET: 상태 진행 조회
  // ==================================================
  if (req.method === 'GET') {
    const stateProgress = await redis.get('stateProgress')
    return res.status(200).json({
      code: 'SUCCESS',
      message: '성공',
      data: stateProgress && JSON.parse(stateProgress),
    })
  }

  // ==================================================
  // 허용되지 않은 메서드
  // ==================================================
  return res.status(405).json({
    code: 'METHOD_NOT_ALLOWED',
    message: 'Method Not Allowed',
    data: null,
  })
}
