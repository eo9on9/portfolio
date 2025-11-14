import { User } from '@shared/server/types'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import users from '../_data/users.json'

const dataFile = path.join(process.cwd(), 'pages', 'api', '_data', 'users.json')

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
      code: 'BAD_REQUEST',
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
      code: 'NOT_FOUND',
      message: 'User not found',
      data: null,
    })
  }

  const user = users[userIndex]!

  // ==================================================
  // GET: 프로필 조회
  // ==================================================
  if (req.method === 'GET') {
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

  // ==================================================
  // PUT: 프로필 업데이트
  // ==================================================
  if (req.method === 'PUT') {
    const { name, phone, role } = req.body as Partial<User>

    if (!name && !phone && !role) {
      return res.status(400).json({
        code: 'BAD_REQUEST',
        message: 'No fields provided to update',
        data: null,
      })
    }

    // 기존 유저 정보 갱신
    const updatedUser = {
      ...user,
      name: name ?? user.name,
      phone: phone ?? user.phone,
      role: role ?? user.role,
    }

    // 배열 업데이트
    users[userIndex] = updatedUser

    // 실제 파일 덮어쓰기
    try {
      fs.writeFileSync(dataFile, JSON.stringify(users, null, 2), 'utf-8')
    } catch (err) {
      console.error('❌ Failed to write users.json:', err)
      return res.status(500).json({
        code: 'INTERNAL_ERROR',
        message: 'Failed to update user data file',
        data: null,
      })
    }

    return res.status(200).json({
      code: 'SUCCESS',
      message: 'Profile updated successfully',
      data: updatedUser,
    })
  }

  // ==================================================
  // 허용되지 않은 메서드
  // ==================================================
  return res.status(405).json({
    code: 'METHOD_NOT_ALLOWED',
    message: 'Only GET and PUT are allowed',
    data: null,
  })
}
