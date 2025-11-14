import { GetSalesRateResDTO } from '@entities/sales/api/getSalesRate'
import users from '@shared/server/data/users.json'
import type { NextApiRequest, NextApiResponse } from 'next'

const data: GetSalesRateResDTO = [
  { name: '전자제품', value: 400 },
  { name: '의류', value: 300 },
  { name: '식품', value: 300 },
  { name: '도서', value: 200 },
]

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

  // 3️⃣ 토큰 유효성 검사
  if (!userId || !issuedAt) {
    return res.status(400).json({
      code: 'UNAUTHORIZED',
      message: 'Invalid token format',
      data: null,
    })
  }

  // 4️⃣ 만료 체크
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
  const userIndex = users.findIndex(u => u.id === userId)
  if (userIndex === -1) {
    return res.status(401).json({
      code: 'UNAUTHORIZED',
      message: 'User not found',
      data: null,
    })
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      code: 'METHOD_NOT_ALLOWED',
      message: 'Method Not Allowed',
      data: null,
    })
  }

  res.status(200).json({
    code: 'SUCCESS',
    message: '성공',
    data,
  })
}
