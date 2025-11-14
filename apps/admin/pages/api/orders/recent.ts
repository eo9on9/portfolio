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
  // GET: 최근 주문 조회
  // ==================================================
  if (req.method === 'GET') {
    const orders = await redis.get('orders')
    const recents = orders && JSON.parse(orders).slice(0, 5)

    return res.status(200).json({
      code: 'SUCCESS',
      message: 'Recent orders fetched successfully',
      data: recents,
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
