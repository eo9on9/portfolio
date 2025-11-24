import { redis } from '@server/redis'
import { NextApiRequest, NextApiResponse } from 'next'

interface FilterParams {
  name?: string
  category?: string
  grade?: string
  type?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const rawItemDB = await redis.get('itemDB')
  const itemDB = rawItemDB && JSON.parse(rawItemDB)

  const rawProducts = await redis.get('products')
  const products = rawProducts && JSON.parse(rawProducts)

  const { page, name, category, grade, type } = req.query as {
    page?: string
  } & FilterParams

  // page는 필수
  if (!page || isNaN(Number(page))) {
    return res.status(400).json({
      code: 'BAD_REQUEST',
      message: '`page` 파라미터는 필수이며 숫자여야 합니다.',
      data: null,
    })
  }

  const pageNum = Number(page)
  const PAGE_SIZE = 20

  // 최신순 정렬
  let filtered = [...products].sort((a, b) => b.created_at - a.created_at)

  // ---- ⭐ 필터링 로직 ----
  filtered = filtered.filter(product => {
    const meta = itemDB[product.item_key as keyof typeof itemDB]

    if (!meta) return false

    if (name && !meta.name.includes(name)) return false
    if (category && meta.category !== category) return false
    if (grade && meta.grade !== grade) return false
    if (type && product.type !== type) return false

    return true
  })

  // ---- ⭐ 페이지네이션 ----
  const start = (pageNum - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  const paginated = filtered.slice(start, end)

  res.status(200).json({
    code: 'SUCCESS',
    message: '상품 목록 조회 성공',
    data: {
      totalPages: Math.ceil(filtered.length / PAGE_SIZE),
      products: paginated,
      page: pageNum,
    },
  })
}
