import { GetSalesRateResDTO } from '@entities/sales/api/getSalesRate'
import type { NextApiRequest, NextApiResponse } from 'next'

const data: GetSalesRateResDTO = [
  { name: '전자제품', value: 400 },
  { name: '의류', value: 300 },
  { name: '식품', value: 300 },
  { name: '도서', value: 200 },
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      code: 'METHOD_NOT_ALLOWED',
      message: 'Method Not Allowed',
      data: null,
    })
  }

  res.status(200).json({
    code: 'SUCCESS',
    message: '성공',
    data,
  })
}
