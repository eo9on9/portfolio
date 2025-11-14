import { redis } from '@server/redis'
import { User } from '@server/types'
import type { NextApiRequest, NextApiResponse } from 'next'

export async function requireAuth(req: NextApiRequest, res: NextApiResponse) {
  // 1) Authorization 헤더 체크
  const authHeader = req.headers.authorization
  if (!authHeader) {
    res.status(401).json({
      code: 'UNAUTHORIZED',
      message: 'Missing Authorization header',
      data: null,
    })
    return null
  }

  // 2) 토큰 추출
  const token = authHeader.replace('Bearer ', '')
  const [, userId, issuedAt] = token.split('_')

  // 3) 형식 검사
  if (!userId || !issuedAt) {
    res.status(400).json({
      code: 'UNAUTHORIZED',
      message: 'Invalid token format',
      data: null,
    })
    return null
  }

  // 4) 만료 체크
  const ONE_HOUR = 60 * 60 * 1000
  if (Date.now() - Number(issuedAt) > ONE_HOUR) {
    res.status(401).json({
      code: 'TOKEN_EXPIRED',
      message: 'Token expired',
      data: null,
    })
    return null
  }

  // 5) Redis 유저 조회
  const users = await redis.get('users')
  const user: User =
    users && JSON.parse(users).find((u: User) => u.id === userId)

  if (!user) {
    res.status(401).json({
      code: 'UNAUTHORIZED',
      message: 'User not found',
      data: null,
    })
    return null
  }

  return user
}
