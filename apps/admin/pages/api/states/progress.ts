import { GetStateProgressResDTO } from '@widgets/dashboard/api/getStateProgress'
import type { NextApiRequest, NextApiResponse } from 'next'

const data: GetStateProgressResDTO = [
  { name: '1월', sales: 4000, order: 2400 },
  { name: '2월', sales: 3000, order: 1398 },
  { name: '3월', sales: 2000, order: 9800 },
  { name: '4월', sales: 2780, order: 3908 },
  { name: '5월', sales: 1890, order: 4800 },
  { name: '6월', sales: 2390, order: 3800 },
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
