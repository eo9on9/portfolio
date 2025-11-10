import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { Customer } from './types'

const PAGE_SIZE = 10
const dataFile = path.join(
  process.cwd(),
  'pages',
  'api',
  'customers',
  'data.json',
)

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // ✅ 고객 목록 조회 (GET)
  if (req.method === 'GET') {
    const fileData = fs.readFileSync(dataFile, 'utf-8')
    let filtered: Customer[] = JSON.parse(fileData)

    const { name, email, phone, status, page = '1' } = req.query

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
      success: true,
      message: '고객 목록 조회 성공',
      data: {
        totalPages: Math.ceil(filtered.length / PAGE_SIZE),
        customers: paged,
      },
    })
  }

  // ✅ 신규 고객 추가 (POST)
  if (req.method === 'POST') {
    const { name, email, phone } = req.body

    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ success: false, message: 'name, email, phone are required' })
    }

    const fileData = fs.readFileSync(dataFile, 'utf-8')
    const customers: Customer[] = JSON.parse(fileData)

    const newId =
      customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1

    const newCustomer: Customer = {
      id: newId,
      name,
      email,
      phone,
      orders: 0,
      spent: 0,
      status: 'inactive',
    }

    customers.push(newCustomer)
    fs.writeFileSync(dataFile, JSON.stringify(customers, null, 2))

    return res.status(201).json({
      success: true,
      message: '신규 고객이 등록되었습니다.',
      data: newCustomer,
    })
  }

  res.setHeader('Allow', ['GET', 'POST'])
  return res.status(405).json({
    success: false,
    message: `Method ${req.method} Not Allowed`,
  })
}
