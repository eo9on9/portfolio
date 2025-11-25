import { Conversation } from '@features/conversation/model/conversation'

export interface ConversationDTO {
  id: string
  partner: string
  product_id: string
  last_message: string
  last_message_at: number
  has_new_message: boolean
}

export const fromConversationDTO = (dto: ConversationDTO): Conversation => {
  return {
    id: dto.id,
    partner: dto.partner,
    productId: dto.product_id,
    lastMessage: dto.last_message,
    lastMessageAt: dto.last_message_at,
    hasNewMessage: dto.has_new_message,
  }
}
