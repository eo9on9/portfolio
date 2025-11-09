import { GetRecentOrdersResDTO } from '@entities/order/api/getRecentOrders'
import type { NextApiRequest, NextApiResponse } from 'next'

const data: GetRecentOrdersResDTO = [
  {
    orderId: 'ORD-001',
    customer: '김철수',
    productName: '노트북',
    amount: 1500000,
    status: 'shipping',
  },
  {
    orderId: 'ORD-002',
    customer: '이영희',
    productName: '유선 프린터',
    amount: 500000,
    status: 'delivered',
  },
  {
    orderId: 'ORD-003',
    customer: '박민수',
    productName: '게이밍 마우스',
    amount: 80000,
    status: 'preparing',
  },
  {
    orderId: 'ORD-004',
    customer: '정수진',
    productName: '스마트 워치',
    amount: 280000,
    status: 'shipping',
  },
  {
    orderId: 'ORD-005',
    customer: '최동욱',
    productName: 'USB-C 허브',
    amount: 195000,
    status: 'delivered',
  },
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  res.status(200).json({
    success: true,
    message: '성공',
    data,
  })
}
