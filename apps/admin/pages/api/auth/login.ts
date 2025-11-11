import type { NextApiRequest, NextApiResponse } from 'next'
import users from '../_data/users.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body
  const user = users.find(u => u.email === email && u.password === password)

  if (!user) return res.status(401).json({ message: 'Invalid credentials' })

  const token = `${user.id}-${Date.now()}`

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    },
  })
}
