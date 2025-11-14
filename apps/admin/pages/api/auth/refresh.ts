import users from '@shared/server/data/users.json'
import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 메서드 제한
  if (req.method !== 'POST') {
    return res.status(405).json({
      code: 'METHOD_NOT_ALLOWED',
      message: 'Only POST is allowed',
      data: null,
    })
  }

  // 1️⃣ Refresh Token 가져오기 (httpOnly 쿠키)
  const refreshToken = req.cookies.refresh_token
  if (!refreshToken) {
    return res.status(401).json({
      code: 'UNAUTHORIZED',
      message: 'Missing refresh token cookie',
      data: null,
    })
  }

  // Refresh Token 파싱
  const [, userId, issuedAt] = refreshToken.split('_')

  if (!userId || !issuedAt) {
    return res.status(400).json({
      code: 'UNAUTHORIZED',
      message: 'Invalid refresh token format',
      data: null,
    })
  }

  // 2️⃣ Refresh Token 만료 검사
  const TWO_WEEKS = 60 * 60 * 24 * 14 * 1000
  const isExpired = Date.now() - Number(issuedAt) > TWO_WEEKS

  if (isExpired) {
    return res.status(401).json({
      code: 'REFRESH_EXPIRED',
      message: 'Refresh token expired – please log in again.',
      data: null,
    })
  }

  // 3️⃣ 유저 존재 여부 확인
  const user = users.find(u => u.id === userId)
  if (!user) {
    return res.status(401).json({
      code: 'UNAUTHORIZED',
      message: 'User not found',
      data: null,
    })
  }

  // 4️⃣ 새 토큰 발급
  const now = Date.now()

  const newAccessToken = `ACCESS_${user.id}_${now}`
  const newRefreshToken = `REFRESH_${user.id}_${now}`

  const cookie = serialize('refresh_token', newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 14,
  })

  res.setHeader('Set-Cookie', cookie)

  return res.status(200).json({
    code: 'SUCCESS',
    message: 'Tokens refreshed successfully',
    data: {
      accessToken: newAccessToken,
    },
  })
}
