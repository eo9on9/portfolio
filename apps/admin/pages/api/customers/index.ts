import { getRedis } from '@server/redis'
import { requireAuth } from '@server/requireAuth'
import { Customer } from '@server/types'
import type { NextApiRequest, NextApiResponse } from 'next'

const PAGE_SIZE = 10

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
  // GET: 고객 목록 조회
  // ==================================================
  if (req.method === 'GET') {
    const rawCustomers = await redis.get('customers')
    const customers = rawCustomers && JSON.parse(rawCustomers)

    const { name, email, phone, status, page = '1' } = req.query

    let filtered: Customer[] = [...customers]

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

    const pageNum = parseInt(page as string, 10) || 1
    const start = (pageNum - 1) * PAGE_SIZE
    const end = start + PAGE_SIZE
    const paged = filtered.slice(start, end)

    return res.status(200).json({
      code: 'SUCCESS',
      message: '고객 목록 조회 성공',
      data: {
        totalPages: Math.ceil(filtered.length / PAGE_SIZE),
        customers: paged,
      },
    })
  }

  // ==================================================
  // POST: 신규 고객 추가
  // ==================================================
  if (req.method === 'POST') {
    const { name, email, phone } = req.body

    if (!name || !email || !phone) {
      return res.status(400).json({
        code: 'BAD_REQUEST',
        message: 'name, email, phone are required',
        data: null,
      })
    }

    const rawCustomers = await redis.get('customers')
    const customers = rawCustomers && JSON.parse(rawCustomers)

    const newId =
      customers.length > 0
        ? Math.max(...customers.map((c: Customer) => c.id)) + 1
        : 1

    const newCustomer: Customer = {
      id: newId,
      name,
      email,
      phone,
      orders: 0,
      spent: 0,
      status: 'inactive',
    }

    const updatedCustomers = [...customers, newCustomer]
    await redis.set('customers', JSON.stringify(updatedCustomers))

    return res.status(201).json({
      code: 'SUCCESS',
      message: '신규 고객이 등록되었습니다.',
      data: newCustomer,
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
