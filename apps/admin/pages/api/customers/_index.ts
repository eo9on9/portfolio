import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  orders: number
  spent: number
  status: 'active' | 'inactive'
}

const PAGE_SIZE = 10
const dataFile = path.join(
  process.cwd(),
  'pages',
  'api',
  'customers',
  'data.json',
)

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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

  // ✅ 고객 수정 (PUT)
  if (req.method === 'PUT') {
    const { id, name, email, phone, status } = req.body

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: '고객 ID가 필요합니다.' })
    }

    const fileData = fs.readFileSync(dataFile, 'utf-8')
    const customers: Customer[] = JSON.parse(fileData)
    const targetId = Number(id)
    const index = customers.findIndex(c => c.id === targetId)

    if (index === -1) {
      return res
        .status(404)
        .json({ success: false, message: '해당 고객을 찾을 수 없습니다.' })
    }

    // 전달된 필드만 업데이트
    const updatedCustomer = {
      ...customers[index],
      ...(name !== undefined && { name }),
      ...(email !== undefined && { email }),
      ...(phone !== undefined && { phone }),
      ...(status !== undefined && { status }),
    }

    customers[index] = updatedCustomer
    fs.writeFileSync(dataFile, JSON.stringify(customers, null, 2))

    return res.status(200).json({
      success: true,
      message: '고객 정보가 수정되었습니다.',
      data: updatedCustomer,
    })
  }

  // ✅ 고객 삭제 (DELETE)
  if (req.method === 'DELETE') {
    const { id } = req.query

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: '고객 ID가 필요합니다.' })
    }

    const fileData = fs.readFileSync(dataFile, 'utf-8')
    const customers: Customer[] = JSON.parse(fileData)
    const targetId = Number(id)

    const index = customers.findIndex(c => c.id === targetId)
    if (index === -1) {
      return res
        .status(404)
        .json({ success: false, message: '해당 고객을 찾을 수 없습니다.' })
    }

    const deleted = customers[index]
    const updated = customers.filter(c => c.id !== targetId)
    fs.writeFileSync(dataFile, JSON.stringify(updated, null, 2))

    return res.status(200).json({
      success: true,
      message: '고객이 삭제되었습니다.',
      data: deleted,
    })
  }

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

  // ✅ 허용되지 않은 메서드
  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
  return res.status(405).json({
    success: false,
    message: `Method ${req.method} Not Allowed`,
  })
}
