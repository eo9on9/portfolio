import { redis } from '@server/redis'
import { Product } from '@server/types'
import { NextApiRequest, NextApiResponse } from 'next'

interface FilterParams {
  item_key: string
  type: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const rawProducts = await redis.get('products')
  const products = rawProducts && (JSON.parse(rawProducts) as Product[])

  if (!products) {
    return res.status(400).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: '서버 오류가 발생했습니다.',
      data: null,
    })
  }

  const { item_key } = req.query as unknown as FilterParams

  if (!item_key) {
    return res.status(400).json({
      code: 'BAD_REQUEST',
      message: '필수 파라미터가 누락되었습니다.',
      data: null,
    })
  }

  let filtered = [...products].sort((a, b) => b.created_at - a.created_at)

  filtered = filtered.filter(product => {
    if (item_key && product.item_key !== item_key) return false

    return true
  })

  res.status(200).json({
    code: 'SUCCESS',
    message: '상품 목록 조회 성공',
    data: {
      products: filtered,
    },
  })
}
