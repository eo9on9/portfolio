import { redis } from '@server/redis'
import { requireAuth } from '@server/requireAuth'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // ==================================================
  // 인증 및 유저 확인
  // ==================================================
  const user = await requireAuth(req, res)

  if (!user) return

  // ==================================================
  // GET: 판매 비율 조회
  // ==================================================
  if (req.method === 'GET') {
    const salesRate = await redis.get('salesRate')

    res.status(200).json({
      code: 'SUCCESS',
      message: '성공',
      data: salesRate && JSON.parse(salesRate),
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
