import { redis } from '@server/redis'
import { requireAuth } from '@server/requireAuth'
import { User } from '@server/types'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // ==================================================
  // 인증 및 유저 확인
  // ==================================================
  const user = await requireAuth(req, res)

  if (!user) return

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
    const users = await redis.get('users')
    const updatedUsers =
      users &&
      JSON.parse(users).map((u: User) => (u.id === user.id ? updatedUser : u))

    await redis.set('users', JSON.stringify(updatedUsers))

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
    message: 'Method Not Allowed',
    data: null,
  })
}
