import { GetStateSummariesResDTO } from '@widgets/dashboard/api/getSummaryStates'
import type { NextApiRequest, NextApiResponse } from 'next'

const data: GetStateSummariesResDTO = {
  customer: {
    total: 2345,
    percentage: 12.5,
  },
  order: {
    total: 1234,
    percentage: 8.2,
  },
  product: {
    total: 567,
    percentage: -1.02,
  },
  sales: {
    total: 45200000,
    percentage: 15.3,
  },
}

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
