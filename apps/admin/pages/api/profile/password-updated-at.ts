import { User } from '@shared/server/types'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

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

  // 2️⃣ 토큰 파싱
  const token = authHeader.replace('Bearer ', '')
  const [, userId, issuedAt] = token.split('_')

  if (!userId || !issuedAt) {
    return res.status(400).json({
      code: 'UNAUTHORIZED',
      message: 'Invalid token format',
      data: null,
    })
  }

  // 3️⃣ 토큰 만료 시뮬레이션 (1시간)
  const ONE_HOUR = 60 * 60 * 1000
  const isExpired = Date.now() - Number(issuedAt) > ONE_HOUR
  if (isExpired) {
    return res.status(401).json({
      code: 'TOKEN_EXPIRED',
      message: 'Token expired',
      data: null,
    })
  }

  // 4️⃣ users.json 파일 읽기
  const dataFile = path.join(
    process.cwd(),
    'pages',
    'api',
    '_data',
    'users.json',
  )

  let users: User[] = []
  try {
    const fileContent = fs.readFileSync(dataFile, 'utf-8')
    users = JSON.parse(fileContent)
  } catch (err) {
    console.error('❌ Failed to read users.json:', err)
    return res.status(500).json({
      code: 'INTERNAL_ERROR',
      message: 'Failed to read user data file',
      data: null,
    })
  }

  // 5️⃣ 유저 찾기
  const user = users.find(u => u.id === userId)
  if (!user) {
    return res.status(401).json({
      code: 'UNAUTHORIZED',
      message: 'User not found',
      data: null,
    })
  }

  // 6️⃣ lastPasswordChangedAt 가져오기
  const lastChanged =
    typeof user.lastPasswordChangedAt === 'number'
      ? user.lastPasswordChangedAt
      : null

  // 7️⃣ 응답
  return res.status(200).json({
    code: 'SUCCESS',
    message: 'Password last changed timestamp fetched successfully',
    data: {
      lastPasswordChangedAt: lastChanged,
    },
  })
}
