import users from '@shared/server/data/users.json'
import { Order } from '@shared/server/types'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

const ordersFile = path.join(
  process.cwd(),
  'source',
  'shared',
  'server',
  'data',
  'orders.json',
)

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 1️⃣ 인증 헤더 확인
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({
      code: 'UNAUTHORIZED',
      message: 'Missing Authorization header',
      data: null,
    })
  }

  // 2️⃣ 토큰 추출
  const token = authHeader.replace('Bearer ', '')
  const [, userId, issuedAt] = token.split('_')

  // 3️⃣ 토큰 유효성 검사
  if (!userId || !issuedAt) {
    return res.status(400).json({
      code: 'UNAUTHORIZED',
      message: 'Invalid token format',
      data: null,
    })
  }

  // 4️⃣ 만료 체크
  const ONE_HOUR = 60 * 60 * 1000
  const isExpired = Date.now() - Number(issuedAt) > ONE_HOUR
  if (isExpired) {
    return res.status(401).json({
      code: 'TOKEN_EXPIRED',
      message: 'Token expired',
      data: null,
    })
  }

  // 5️⃣ 유저 찾기
  const userIndex = users.findIndex(u => u.id === userId)
  if (userIndex === -1) {
    return res.status(401).json({
      code: 'UNAUTHORIZED',
      message: 'User not found',
      data: null,
    })
  }

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
    let orders: Order[] = []
    try {
      const fileContent = fs.readFileSync(ordersFile, 'utf-8')
      orders = JSON.parse(fileContent)
    } catch (err) {
      console.error('❌ Failed to read orders.json:', err)
      return res.status(500).json({
        code: 'INTERNAL_ERROR',
        message: 'Failed to read orders data file',
        data: null,
      })
    }

    // 해당 주문 찾기
    const orderIndex = orders.findIndex(order => order.id === id)
    if (orderIndex === -1) {
      return res.status(404).json({
        code: 'NOT_FOUND',
        message: `Order with id '${id}' not found`,
        data: null,
      })
    }

    // 상태 업데이트
    orders[orderIndex]!.status = status as Order['status']

    // 파일 저장
    try {
      fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2), 'utf-8')
    } catch (err) {
      console.error('❌ Failed to write orders.json:', err)
      return res.status(500).json({
        code: 'INTERNAL_ERROR',
        message: 'Failed to update order status',
        data: null,
      })
    }

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
