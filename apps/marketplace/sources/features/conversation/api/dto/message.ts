import { Message } from '@features/conversation/model/message'

export interface MessageDTO {
  id: string
  conversation_id: string
  sender: string
  content: string
  created_at: number
}

export const fromMessageDTO = (dto: MessageDTO): Message => {
  return {
    id: dto.id,
    conversationId: dto.conversation_id,
    sender: dto.sender,
    content: dto.content,
    createdAt: dto.created_at,
  }
}
