import { getRedis } from '@server/redis'
import { requireAuth } from '@server/requireAuth'
import { User } from '@server/types'
import type { NextApiRequest, NextApiResponse } from 'next'

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
    const updatedUser = {
      ...user,
      password: newPassword,
    }

    const users = await redis.get('users')
    const updatedUsers =
      users &&
      JSON.parse(users).map((u: User) => (u.id === user.id ? updatedUser : u))

    await redis.set('users', JSON.stringify(updatedUsers))

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
