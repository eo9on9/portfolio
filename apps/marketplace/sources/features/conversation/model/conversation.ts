export interface Conversation {
  id: string
  partner: string
  productId: string
  lastMessage: string
  lastMessageAt: number
  hasNewMessage: boolean
}
