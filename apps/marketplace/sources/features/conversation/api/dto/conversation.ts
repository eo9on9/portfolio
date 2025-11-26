import { Conversation } from '@features/conversation/model/conversation'

export interface ConversationDTO {
  conversation_id: string
  partner: string
  product_id: string
  last_message: string
  last_message_at: number
  has_new_message: boolean
}

export const fromConversationDTO = (dto: ConversationDTO): Conversation => {
  return {
    conversationId: dto.conversation_id,
    partner: dto.partner,
    productId: dto.product_id,
    lastMessage: dto.last_message,
    lastMessageAt: dto.last_message_at,
    hasNewMessage: dto.has_new_message,
  }
}
