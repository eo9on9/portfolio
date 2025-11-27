import { redis } from '@server/redis'
import { NextApiRequest, NextApiResponse } from 'next'

interface Params {
  item_key: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const rawPriceHistory = await redis.get('priceHistory')
  const priceHistory = rawPriceHistory && JSON.parse(rawPriceHistory)

  if (!priceHistory) {
    return res.status(400).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: '서버 오류가 발생했습니다.',
      data: null,
    })
  }

  const { item_key } = req.query as unknown as Params

  if (!item_key) {
    return res.status(400).json({
      code: 'BAD_REQUEST',
      message: '필수 파라미터가 누락되었습니다.',
      data: null,
    })
  }

  const history: { date: number; price: number }[] = []
  const now = Date.now()

  for (let i = 0; i < 7; i++) {
    history.push({
      date: now - (7 - i) * 24 * 60 * 60 * 1000,
      price: priceHistory[item_key][i],
    })
  }

  const average =
    history.reduce((acc: number, curr) => acc + curr.price, 0) / history.length

  res.status(200).json({
    code: 'SUCCESS',
    message: '가격 이력 조회 성공',
    data: {
      history,
      average,
    },
  })
}
