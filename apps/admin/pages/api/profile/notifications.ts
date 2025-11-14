import { getRedis } from '@server/redis'
import { requireAuth } from '@server/requireAuth'
import { User } from '@server/types'
import type { NextApiRequest, NextApiResponse } from 'next'

type NotificationKeys =
  | 'newOrder'
  | 'lowStock'
  | 'customerInquiry'
  | 'deliveryStatusChange'
  | 'weeklyReport'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const redis = await getRedis()

  // ==================================================
  // 인증 및 유저 확인
  // ==================================================
  const user = await requireAuth(req, res)

  if (!user) return

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

    const updatedUser = {
      ...user,
      notifications: {
        ...user.notifications,
        ...updates,
      },
    }

    const users = await redis.get('users')
    const updatedUsers =
      users &&
      JSON.parse(users).map((u: User) => (u.id === user.id ? updatedUser : u))

    await redis.set('users', JSON.stringify(updatedUsers))

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
    message: 'Method Not Allowed',
    data: null,
  })
}
