import { MY_NAME } from '@server/constants'
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
  const rawProducts = await redis.get('products')
  const products = rawProducts && (JSON.parse(rawProducts) as Product[])

  if (!products) {
    return res.status(400).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: '서버 오류가 발생했습니다.',
      data: null,
    })
  }

  if (req.method === 'GET') {
    const product = products.find(p => p.id === req.query.id)

    return res.status(200).json({
      code: 'SUCCESS',
      message: '상품 목록 조회 성공',
      data: {
        product,
      },
    })
  }

  if (req.method === 'POST') {
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
      listed_by: MY_NAME,
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

  if (req.method === 'DELETE') {
    const { id } = req.body as unknown as { id: string }

    const newProducts = products.filter(p => p.id !== id)
    await redis.set('products', JSON.stringify(newProducts))

    return res.status(200).json({
      code: 'SUCCESS',
      message: '상품 삭제 성공',
      data: null,
    })
  }

  return res.status(405).json({
    code: 'METHOD_NOT_ALLOWED',
    message: 'Method Not Allowed',
    data: null,
  })
}
