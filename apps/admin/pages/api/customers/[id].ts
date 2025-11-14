import { redis } from '@server/redis'
import { requireAuth } from '@server/requireAuth'
import { Customer } from '@server/types'
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

  const { id } = req.query
  const targetId = Number(id)

  if (!id || isNaN(targetId)) {
    return res.status(400).json({
      code: 'BAD_REQUEST',
      message: '유효한 고객 ID가 필요합니다.',
      data: null,
    })
  }

  const rawCustomers = await redis.get('customers')
  const customers = rawCustomers && JSON.parse(rawCustomers)
  const index = customers.findIndex((c: Customer) => c.id === targetId)

  // ==================================================
  // GET: 단일 고객 조회
  // ==================================================
  if (req.method === 'GET') {
    const customer = customers.find((c: Customer) => c.id === targetId)
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

  // ==================================================
  // PUT: 고객 정보 수정
  // ==================================================
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

    const updatedCustomers = customers.map((c: Customer) =>
      c.id === targetId ? updatedCustomer : c,
    )

    await redis.set('customers', JSON.stringify(updatedCustomers))

    return res.status(200).json({
      code: 'SUCCESS',
      message: '고객 정보가 수정되었습니다.',
      data: updatedCustomer,
    })
  }

  // ==================================================
  // DELETE: 고객 삭제
  // ==================================================
  if (req.method === 'DELETE') {
    if (index === -1) {
      return res.status(404).json({
        code: 'NOT_FOUND',
        message: '해당 고객을 찾을 수 없습니다.',
        data: null,
      })
    }

    const deleted = customers[index]
    const updated = customers.filter((c: Customer) => c.id !== targetId)

    await redis.set('customers', JSON.stringify(updated))

    return res.status(200).json({
      code: 'SUCCESS',
      message: '고객이 삭제되었습니다.',
      data: deleted,
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
