import { redis } from '@server/redis'
import { Product } from '@server/types'
import { NextApiRequest, NextApiResponse } from 'next'

interface NewProductParams {
  item_key: string
  type: string
  price: number
  amount: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const rawProducts = await redis.get('products')
    const products = rawProducts && (JSON.parse(rawProducts) as Product[])

    if (!products) {
      return res.status(400).json({
        code: 'INTERNAL_SERVER_ERROR',
        message: '서버 오류가 발생했습니다.',
        data: null,
      })
    }

    const { item_key, type, price, amount } =
      req.body as unknown as NewProductParams

    if (!item_key || !type || !price || !amount) {
      return res.status(400).json({
        code: 'BAD_REQUEST',
        message: '필수 파라미터가 누락되었습니다.',
        data: null,
      })
    }

    const maxId =
      products.length > 0 ? Math.max(...products.map(p => Number(p.id))) : 0

    const newProduct: Product = {
      id: (maxId + 1).toString(),
      item_key,
      type,
      listed_by: '용사(나)',
      price,
      amount,
      created_at: Date.now(),
    }

    const newProducts = [newProduct, ...products]
    await redis.set('products', JSON.stringify(newProducts))

    res.status(200).json({
      code: 'SUCCESS',
      message: '상품 등록 성공',
      data: {
        product: newProduct,
      },
    })
  }

  return res.status(405).json({
    code: 'METHOD_NOT_ALLOWED',
    message: 'Method Not Allowed',
    data: null,
  })
}
