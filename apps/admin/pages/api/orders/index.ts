import { getRedis } from '@shared/server/redis'
import { requireAuth } from '@shared/server/requireAuth'
import { Order } from '@shared/server/types'
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
  // GET: 주문 목록 조회
  // ==================================================
  if (req.method === 'GET') {
    const rawOrders = await redis.get('orders')
    const orders = rawOrders && JSON.parse(rawOrders)

    // 쿼리 파라미터 추출
    const { query, page, status } = req.query
    const pageNum = Number(page)

    // page는 필수
    if (!page || isNaN(pageNum) || pageNum < 1) {
      return res.status(400).json({
        code: 'BAD_REQUEST',
        message:
          'Query parameter "page" is required and must be a positive number',
        data: null,
      })
    }

    // 필터링 로직
    let filtered = orders

    // 🔍 검색어(query) 필터
    if (query && String(query).trim() !== '') {
      const q = String(query).toLowerCase()
      filtered = filtered.filter((order: Order) => {
        return (
          order.id.toLowerCase().includes(q) ||
          order.customer.toLowerCase().includes(q) ||
          order.product.toLowerCase().includes(q)
        )
      })
    }

    // 🔍 상태(status) 필터
    if (status && String(status).trim() !== '') {
      const s = String(status).toLowerCase()
      filtered = filtered.filter(
        (order: Order) => order.status.toLowerCase() === s,
      )
    }

    // 페이지네이션
    const PAGE_SIZE = 10
    const start = (pageNum - 1) * PAGE_SIZE
    const end = start + PAGE_SIZE
    const paginated = filtered.slice(start, end)

    // 메타데이터
    const totalItems = filtered.length
    const totalPages = Math.ceil(totalItems / PAGE_SIZE)

    return res.status(200).json({
      code: 'SUCCESS',
      message: 'Orders fetched successfully',
      data: {
        totalPages,
        orders: paginated,
      },
    })
  }

  // ==================================================
  // 허용되지 않은 메서드
  // ==================================================
  return res.status(405).json({
    code: 'METHOD_NOT_ALLOWED',
    message: 'Only GET is allowed',
    data: null,
  })
}
