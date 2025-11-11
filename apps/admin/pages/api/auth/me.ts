import type { NextApiRequest, NextApiResponse } from 'next'
import users from '../_data/users.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1️⃣ 인증 헤더 확인
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Missing Authorization header' })
  }

  // 2️⃣ 토큰 추출
  const token = authHeader.replace('Bearer ', '')
  const [userId, issuedAt] = token.split('-')

  // 3️⃣ 유효성 검사 (토큰 구조 확인)
  if (!userId || !issuedAt) {
    return res.status(400).json({ message: 'Invalid token format' })
  }

  // 4️⃣ 토큰 만료 시뮬레이션 (예: 1시간)
  const ONE_HOUR = 60 * 60 * 1000
  const isExpired = Date.now() - Number(issuedAt) > ONE_HOUR

  if (isExpired) {
    return res.status(401).json({ message: 'Token expired' })
  }

  // 5️⃣ 유저 찾기
  const user = users.find(u => u.id === userId)

  if (!user) {
    return res.status(401).json({ message: 'User not found' })
  }

  // 6️⃣ 성공 응답
  return res.status(200).json({
    success: true,
    message: 'User found',
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    },
  })
}
