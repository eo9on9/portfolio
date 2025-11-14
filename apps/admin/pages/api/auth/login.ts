import users from '@shared/server/data/users.json'
import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body
  const user = users.find(u => u.email === email && u.password === password)

  if (!user)
    return res
      .status(401)
      .json({ code: 'NOT_FOUND', message: 'Invalid credentials', data: null })

  const now = new Date().getTime()

  const accessToken = `ACCESS_${user.id}_${now}`
  const refreshToken = `REFRESH_${user.id}_${now}`

  const cookie = serialize('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 14, // 14d
  })

  res.setHeader('Set-Cookie', cookie)

  res.status(200).json({
    code: 'SUCCESS',
    message: 'Login successful',
    data: {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
      },
    },
  })
}
