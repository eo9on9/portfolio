import { GetSalesRateResDTO } from '@entities/sales/api/getSalesRate'
import type { NextApiRequest, NextApiResponse } from 'next'

const data: GetSalesRateResDTO = [
  { name: '전자제품', value: 400 },
  { name: '의류', value: 300 },
  { name: '식품', value: 300 },
  { name: '도서', value: 200 },
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetSalesRateResDTO | { message: string }>,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  res.status(200).json(data)
}
