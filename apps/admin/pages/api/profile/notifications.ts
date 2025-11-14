import users from '@shared/server/data/users.json'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

// 알림 설정 타입
type NotificationKeys =
  | 'newOrder'
  | 'lowStock'
  | 'customerInquiry'
  | 'deliveryStatusChange'
  | 'weeklyReport'

const dataFile = path.join(
  process.cwd(),
  'source',
  'shared',
  'server',
  'data',
  'users.json',
)

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

  // 4️⃣ 유저 찾기
  const userIndex = users.findIndex(u => u.id === userId)
  if (userIndex === -1) {
    return res.status(401).json({
      code: 'UNAUTHORIZED',
      message: 'User not found',
      data: null,
    })
  }

  const user = users[userIndex]!

  // ==================================================
  // GET: 알림 설정 조회
  // ==================================================
  if (req.method === 'GET') {
    return res.status(200).json({
      code: 'SUCCESS',
      message: 'Notification settings fetched successfully',
      data: user.notifications,
    })
  }

  // ==================================================
  // PUT: 알림 설정 변경
  // ==================================================
  if (req.method === 'PUT') {
    const updates = req.body as Partial<Record<NotificationKeys, boolean>>

    // 요청 바디 유효성 검사
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({
        code: 'BAD_REQUEST',
        message: 'Request body must include at least one notification key',
        data: null,
      })
    }

    // 유효한 키만 필터링
    const validKeys = Object.keys(user.notifications) as NotificationKeys[]
    const invalidKeys = Object.keys(updates).filter(
      key => !validKeys.includes(key as NotificationKeys),
    )

    if (invalidKeys.length > 0) {
      return res.status(400).json({
        code: 'BAD_REQUEST',
        message: `Unknown notification keys: ${invalidKeys.join(', ')}`,
        data: null,
      })
    }

    // 업데이트 적용
    for (const [key, value] of Object.entries(updates)) {
      if (typeof value === 'boolean') {
        user.notifications[key as NotificationKeys] = value
      }
    }

    users[userIndex] = user

    // 파일 저장
    try {
      fs.writeFileSync(dataFile, JSON.stringify(users, null, 2), 'utf-8')
    } catch (err) {
      console.error('❌ Failed to write users.json:', err)
      return res.status(500).json({
        code: 'INTERNAL_ERROR',
        message: 'Failed to update notification settings file',
        data: null,
      })
    }

    return res.status(200).json({
      code: 'SUCCESS',
      message: 'Notification settings updated successfully',
      data: user.notifications,
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
