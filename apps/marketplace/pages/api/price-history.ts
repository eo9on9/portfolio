import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return res.status(200).json({
    code: 'SUCCESS',
    message: 'Price history fetched successfully',
    data: {
      price_history: [
        {
          date: new Date('2025-11-17'), // 오늘 기준 7일 전: 13자리 타임스탬프로
          price: 990000,
        },
        {
          date: new Date('2025-11-18'), // 오늘 기준 6일 전: 13자리 타임스탬프로
          price: 1000000,
        },
        {
          date: new Date('2025-11-19'), // 오늘 기준 5일 전: 13자리 타임스탬프로
          price: 1050000,
        },
        {
          date: new Date('2025-11-20'), // 오늘 기준 4일 전: 13자리 타임스탬프로
          price: 1020000,
        },
        {
          date: new Date('2025-11-21'), // 오늘 기준 3일 전: 13자리 타임스탬프로
          price: 1100000,
        },
        {
          date: new Date('2025-11-22'), // 오늘 기준 2일 전: 13자리 타임스탬프로
          price: 950000,
        },
        {
          date: new Date('2025-11-23'), // 오늘 기준 1일 전: 13자리 타임스탬프로
          price: 980000,
        },
      ],
      average_price: 1012857,
    },
  })
}
