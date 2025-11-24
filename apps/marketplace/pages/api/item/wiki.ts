import { redis } from '@server/redis'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const rawItemWiki = await redis.get('itemDB')
  const itemWiki = rawItemWiki && JSON.parse(rawItemWiki)

  res.status(200).json({
    code: 'SUCCESS',
    message: 'ItemDB 조회 성공',
    data: itemWiki,
  })
}
