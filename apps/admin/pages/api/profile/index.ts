import type { NextApiRequest, NextApiResponse } from 'next'
import users from '../_data/users.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1️⃣ 인증 헤더 확인
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      code: 'UNAUTHORIZED',
      message: 'Missing Authorization header',
      data: null,
    })
  }

  // 2️⃣ 토큰 추출
  const token = authHeader.replace('Bearer ', '')
  const [, userId, issuedAt] = token.split('_')

  // 3️⃣ 유효성 검사 (토큰 구조 확인)
  if (!userId || !issuedAt) {
    return res.status(400).json({
      code: 'BAD_REQUEST',
      message: 'Invalid token format',
      data: null,
    })
  }

  // 4️⃣ 토큰 만료 시뮬레이션 (예: 1시간)
  const ONE_HOUR = 60 * 60 * 1000
  const isExpired = Date.now() - Number(issuedAt) > ONE_HOUR

  if (isExpired) {
    return res.status(401).json({
      code: 'TOKEN_EXPIRED',
      message: 'Token expired',
      data: null,
    })
  }

  // 5️⃣ 유저 찾기
  const user = users.find(u => u.id === userId)

  if (!user) {
    return res.status(401).json({
      code: 'BAD_REQUEST',
      message: 'User not found',
      data: null,
    })
  }

  // 6️⃣ 성공 응답
  return res.status(200).json({
    code: 'SUCCESS',
    message: 'User found',
    data: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  })
}
