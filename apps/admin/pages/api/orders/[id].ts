import { getRedis } from '@server/redis'
import { requireAuth } from '@server/requireAuth'
import { Order } from '@server/types'
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
  // PUT: 주문 상태 변경
  // ==================================================
  if (req.method === 'PUT') {
    const { id } = req.query
    const { status } = req.body as { status: string }

    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        code: 'BAD_REQUEST',
        message: 'Order ID is required in the URL',
        data: null,
      })
    }

    if (!status || typeof status !== 'string') {
      return res.status(400).json({
        code: 'BAD_REQUEST',
        message: 'Status is required in request body',
        data: null,
      })
    }

    // 파일 읽기
    const rawOrders = await redis.get('orders')
    const orders = rawOrders && JSON.parse(rawOrders)

    // 해당 주문 찾기
    const orderIndex = orders.findIndex((order: Order) => order.id === id)
    if (orderIndex === -1) {
      return res.status(404).json({
        code: 'NOT_FOUND',
        message: `Order with id '${id}' not found`,
        data: null,
      })
    }

    // 상태 업데이트
    const updatedOrders = orders.map((order: Order) =>
      order.id === id ? { ...order, status } : order,
    )

    await redis.set('orders', JSON.stringify(updatedOrders))

    return res.status(200).json({
      code: 'SUCCESS',
      message: `Order ${id} status updated to '${status}'`,
      data: orders[orderIndex],
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
