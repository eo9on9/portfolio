import {
  ConversationDTO,
  fromConversationDTO,
} from '@features/conversation/api/dto/conversation'
import { Conversation } from '@features/conversation/model/conversation'
import { request } from '@shared/api/request'

interface GetConversationsDTO {
  conversations: ConversationDTO[]
}

export interface GetConversationsRes {
  conversations: Conversation[]
}

const fromGetConversationsDTO = (
  dto: GetConversationsDTO,
): GetConversationsRes => {
  return {
    conversations: dto.conversations.map(conversation =>
      fromConversationDTO(conversation),
    ),
  }
}

export const getConversations = async (): Promise<GetConversationsRes> => {
  const response = await request.get<GetConversationsDTO>('/conversation/list')

  return fromGetConversationsDTO(response)
}
