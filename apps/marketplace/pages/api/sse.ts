import { redis } from '@server/redis'
import { Conversation } from '@server/types'
import type { NextApiRequest, NextApiResponse } from 'next'

const clients: NextApiResponse[] = []

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // SSE 헤더 설정
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache, no-transform')
  res.setHeader('Connection', 'keep-alive')
  // res.setHeader('X-Accel-Buffering', 'no') // nginx/Vercel에서 버퍼링 방지
  res.flushHeaders()

  const rawConversations = await redis.get('conversations')
  const conversations = rawConversations && JSON.parse(rawConversations)

  res.write(
    `data: ${JSON.stringify({ type: 'new-message-count', payload: conversations.filter((c: Conversation) => c.has_new_message).length })}\n\n`,
  )

  // 연결 저장
  clients.push(res)

  // 연결 종료 처리
  req.on('close', () => {
    const idx = clients.indexOf(res)
    if (idx !== -1) clients.splice(idx, 1)
    res.end()
  })
}

// 메시지를 모든 클라이언트에게 푸시하는 함수
export function sendToAll(data: unknown) {
  clients.forEach(client => {
    client.write(`data: ${JSON.stringify(data)}\n\n`)
  })
}
