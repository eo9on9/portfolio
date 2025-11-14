import users from '@shared/server/data/users.json'
import { GetStateSummariesResDTO } from '@widgets/dashboard/api/getSummaryStates'
import type { NextApiRequest, NextApiResponse } from 'next'

const data: GetStateSummariesResDTO = {
  customer: {
    total: 2345,
    percentage: 12.5,
  },
  order: {
    total: 1234,
    percentage: 8.2,
  },
  product: {
    total: 567,
    percentage: -1.02,
  },
  sales: {
    total: 45200000,
    percentage: 15.3,
  },
}

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
