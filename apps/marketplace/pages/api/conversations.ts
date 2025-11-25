import { redis } from '@server/redis'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // const rawItemDB = await redis.get('itemDB')
  // const itemDB = rawItemDB && JSON.parse(rawItemDB)

  const rawConversations = await redis.get('conversations')
  const conversations = rawConversations && JSON.parse(rawConversations)

  if (!conversations) {
    return res.status(400).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: '서버 오류가 발생했습니다.',
      data: null,
    })
  }

  // 최신순 정렬
  const filtered = [...conversations].sort(
    (a, b) => b.last_message_at - a.last_message_at,
  )

  // ---- ⭐ 필터링 로직 ----
  // filtered = filtered.filter(product => {
  //   const meta = itemDB[product.item_key as keyof typeof itemDB]

  //   if (!meta) return false

  //   if (name && !meta.name.includes(name)) return false
  //   if (category && meta.category !== category) return false
  //   if (grade && meta.grade !== grade) return false
  //   if (type && product.type !== type) return false

  //   return true
  // })

  // ---- ⭐ 페이지네이션 ----
  // const start = (pageNum - 1) * PAGE_SIZE
  // const end = start + PAGE_SIZE
  // const paginated = filtered.slice(start, end)

  res.status(200).json({
    code: 'SUCCESS',
    message: '대화 목록 조회 성공',
    data: {
      conversations: filtered,
    },
  })
}
