import { Message } from '@features/conversation/model/message'

export function groupMessagesByDate(messages: Message[]) {
  return messages.reduce((acc: Record<string, Message[]>, msg) => {
    const date = new Date(msg.createdAt).toISOString().slice(0, 10) // YYYY-MM-DD

    if (!acc[date]) acc[date] = []
    acc[date].push(msg)
    return acc
  }, {})
}
