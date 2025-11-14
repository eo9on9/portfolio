import users from '@shared/server/data/users.json'
import { Order } from '@shared/server/types'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

const dataFile = path.join(
  process.cwd(),
  'source',
  'shared',
  'server',
  'data',
  'orders.json',
)

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // ==================================================
  // GET 메서드만 허용
  // ==================================================
  if (req.method !== 'GET') {
    return res.status(405).json({
      code: 'METHOD_NOT_ALLOWED',
      message: 'Only GET is allowed',
      data: null,
    })
  }

  // ==================================================
  // Authorization 헤더 검증
  // ==================================================
  // 1️⃣ Authorization 헤더 검증
  const authHeader = req.headers.authorization

  console.log('authHeader', authHeader)

  if (!authHeader) {
    return res.status(401).json({
      code: 'UNAUTHORIZED',
      message: 'Missing Authorization header',
      data: null,
    })
  }

  // Bearer <token>
  const token = authHeader.replace('Bearer ', '')
  const [, userId, issuedAt] = token.split('_')

  if (!userId || !issuedAt) {
    return res.status(400).json({
      code: 'UNAUTHORIZED',
      message: 'Invalid token format',
      data: null,
    })
  }

  // 2️⃣ Access Token 만료 검사 (1시간)
  const ONE_HOUR = 60 * 60 * 1000
  const isExpired = Date.now() - Number(issuedAt) > ONE_HOUR

  if (isExpired) {
    return res.status(401).json({
      code: 'TOKEN_EXPIRED',
      message: 'Token expired',
      data: null,
    })
  }

  // 3️⃣ 유저 존재 여부 확인
  const user = users.find(u => u.id === userId)
  if (!user) {
    return res.status(401).json({
      code: 'UNAUTHORIZED',
      message: 'User not found',
      data: null,
    })
  }

  // ==================================================
  // GET: 최근 주문 조회
  // ==================================================
  // 4️⃣ 주문 데이터 읽기
  let orders: Order[] = []

  try {
    const raw = fs.readFileSync(dataFile, 'utf-8')
    orders = JSON.parse(raw)
  } catch (err) {
    console.error('❌ Failed to read orders.json:', err)
    return res.status(500).json({
      code: 'INTERNAL_ERROR',
      message: 'Failed to load order data',
      data: null,
    })
  }

  // 6️⃣ 상위 5개만 반환
  const recentFive = orders.slice(0, 5)

  return res.status(200).json({
    code: 'SUCCESS',
    message: 'Recent orders fetched successfully',
    data: recentFive,
  })
}
