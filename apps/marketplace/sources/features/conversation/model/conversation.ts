export interface Conversation {
  conversationId: string
  partner: string
  productId: string
  lastMessage: string
  lastMessageAt: number
  hasNewMessage: boolean
}
