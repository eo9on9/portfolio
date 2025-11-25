import { redis } from '@server/redis'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const rawItemWiki = await redis.get('itemDB')
  const itemWiki = rawItemWiki && JSON.parse(rawItemWiki)

  if (!itemWiki) {
    return res.status(400).json({
      code: 'INTERNAL_SERVER_ERROR',
      message: '서버 오류가 발생했습니다.',
      data: null,
    })
  }

  res.status(200).json({
    code: 'SUCCESS',
    message: 'ItemDB 조회 성공',
    data: itemWiki,
  })
}
