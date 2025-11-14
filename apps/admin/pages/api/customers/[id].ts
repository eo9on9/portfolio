import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { Customer } from './types'

const dataFile = path.join(
  process.cwd(),
  'pages',
  'api',
  '_data',
  'customers.json',
)

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const targetId = Number(id)

  if (!id || isNaN(targetId)) {
    return res.status(400).json({
      code: 'BAD_REQUEST',
      message: '유효한 고객 ID가 필요합니다.',
      data: null,
    })
  }

  const fileData = fs.readFileSync(dataFile, 'utf-8')
  const customers: Customer[] = JSON.parse(fileData)
  const index = customers.findIndex(c => c.id === targetId)

  // ✅ 단일 고객 조회 (GET)
  if (req.method === 'GET') {
    const customer = customers.find(c => c.id === targetId)
    if (!customer) {
      return res.status(404).json({
        code: 'NOT_FOUND',
        message: '해당 고객을 찾을 수 없습니다.',
        data: null,
      })
    }

    return res.status(200).json({
      success: true,
      message: '고객 조회 성공',
      data: customer,
    })
  }

  // ✅ 고객 수정 (PUT)
  if (req.method === 'PUT') {
    const { name, email, phone, status } = req.body

    if (index === -1) {
      return res.status(404).json({
        code: 'NOT_FOUND',
        message: '해당 고객을 찾을 수 없습니다.',
        data: null,
      })
    }

    const updatedCustomer = {
      ...customers[index],
      ...(name !== undefined && { name }),
      ...(email !== undefined && { email }),
      ...(phone !== undefined && { phone }),
      ...(status !== undefined && { status }),
    }

    customers[index] = updatedCustomer as Customer
    fs.writeFileSync(dataFile, JSON.stringify(customers, null, 2))

    return res.status(200).json({
      code: 'SUCCESS',
      message: '고객 정보가 수정되었습니다.',
      data: updatedCustomer,
    })
  }

  // ✅ 고객 삭제 (DELETE)
  if (req.method === 'DELETE') {
    if (index === -1) {
      return res.status(404).json({
        code: 'NOT_FOUND',
        message: '해당 고객을 찾을 수 없습니다.',
        data: null,
      })
    }

    const deleted = customers[index]
    const updated = customers.filter(c => c.id !== targetId)
    fs.writeFileSync(dataFile, JSON.stringify(updated, null, 2))

    return res.status(200).json({
      code: 'SUCCESS',
      message: '고객이 삭제되었습니다.',
      data: deleted,
    })
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
  return res.status(405).json({
    code: 'METHOD_NOT_ALLOWED',
    message: `Method ${req.method} Not Allowed`,
    data: null,
  })
}
