import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import users from '../_data/users.json'
import { Order } from './types'

const ordersFile = path.join(
  process.cwd(),
  'pages',
  'api',
  '_data',
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
      code: 'BAD_REQUEST',
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
      code: 'NOT_FOUND',
      message: 'User not found',
      data: null,
    })
  }

  // ==================================================
  // GET: 주문 목록 조회
  // ==================================================
  if (req.method === 'GET') {
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
      filtered = filtered.filter(order => {
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
      filtered = filtered.filter(order => order.status.toLowerCase() === s)
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
