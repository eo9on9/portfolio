import { CustomerDTO } from '@entities/customer/api/getCustomers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { mockCustomers } from './mock'

const PAGE_SIZE = 10

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { name, email, phone, status, page = '1' } = req.query

  // 필터링 로직
  let filtered = mockCustomers as CustomerDTO[]

  if (name) {
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(String(name).toLowerCase()),
    )
  }
  if (email) {
    filtered = filtered.filter(c =>
      c.email.toLowerCase().includes(String(email).toLowerCase()),
    )
  }
  if (phone) {
    filtered = filtered.filter(c => c.phone.includes(String(phone)))
  }
  if (status) {
    filtered = filtered.filter(c => c.status === status)
  }

  // 페이지네이션
  const pageNum = parseInt(page as string, 10) || 1
  const start = (pageNum - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  const paged = filtered.slice(start, end)

  // 응답
  return res.status(200).json({
    totalPages: Math.ceil(filtered.length / PAGE_SIZE),
    customers: paged,
  })
}
