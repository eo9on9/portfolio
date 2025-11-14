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

  // 2️⃣ 토큰 파싱
  const token = authHeader.replace('Bearer ', '')
  const [, userId, issuedAt] = token.split('_')

  if (!userId || !issuedAt) {
    return res.status(400).json({
      code: 'BAD_REQUEST',
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

  // 4️⃣ 유저 찾기
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
  // PUT: 비밀번호 변경
  // ==================================================
  if (req.method === 'PUT') {
    const { oldPassword, newPassword } = req.body as {
      oldPassword?: string
      newPassword?: string
    }

    // 입력값 검사
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        code: 'BAD_REQUEST',
        message: 'Both oldPassword and newPassword are required',
        data: null,
      })
    }

    // 기존 비밀번호 확인
    if (user.password !== oldPassword) {
      return res.status(401).json({
        code: 'INVALID_PASSWORD',
        message: 'Old password does not match',
        data: null,
      })
    }

    // 새 비밀번호와 기존 비밀번호가 같으면 오류 반환
    if (newPassword === oldPassword) {
      return res.status(400).json({
        code: 'BAD_REQUEST',
        message: 'New password cannot be the same as the old password',
        data: null,
      })
    }

    // 새 비밀번호 유효성 검사 (기본 예시)
    if (newPassword.length < 6) {
      return res.status(400).json({
        code: 'BAD_REQUEST',
        message: 'New password must be at least 6 characters long',
        data: null,
      })
    }

    // 비밀번호 변경
    user.password = newPassword
    user.lastPasswordChangedAt = Date.now()
    users[userIndex] = user

    // 파일 저장
    try {
      fs.writeFileSync(dataFile, JSON.stringify(users, null, 2), 'utf-8')
    } catch (err) {
      console.error('❌ Failed to write users.json:', err)
      return res.status(500).json({
        code: 'INTERNAL_ERROR',
        message: 'Failed to update user password file',
        data: null,
      })
    }

    return res.status(200).json({
      code: 'SUCCESS',
      message: 'Password updated successfully',
      data: null,
    })
  }

  // ==================================================
  // 허용되지 않은 메서드
  // ==================================================
  return res.status(405).json({
    code: 'METHOD_NOT_ALLOWED',
    message: 'Only PUT is allowed',
    data: null,
  })
}
