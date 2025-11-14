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
  // GET: 비밀번호 변경 시간 조회
  // ==================================================
  if (req.method === 'GET') {
    const lastChanged =
      typeof user.lastPasswordChangedAt === 'number'
        ? user.lastPasswordChangedAt
        : null

    return res.status(200).json({
      code: 'SUCCESS',
      message: 'Password last changed timestamp fetched successfully',
      data: {
        lastPasswordChangedAt: lastChanged,
      },
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
