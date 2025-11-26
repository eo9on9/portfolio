import { Message } from '@features/conversation/model/message'

export interface MessageDTO {
  message_id: string
  conversation_id: string
  sender: string
  content: string
  created_at: number
}

export const fromMessageDTO = (dto: MessageDTO): Message => {
  return {
    messageId: dto.message_id,
    conversationId: dto.conversation_id,
    sender: dto.sender,
    content: dto.content,
    createdAt: dto.created_at,
  }
}
