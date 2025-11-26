import {
  ConversationDTO,
  fromConversationDTO,
} from '@features/conversation/api/dto/conversation'
import { Conversation } from '@features/conversation/model/conversation'
import { request } from '@shared/api/request'

interface GetConversationParamsDTO {
  conversation_id: string
}

export interface GetConversationParams {
  conversationId: string
}

const toGetConversationParamsDTO = (
  params: GetConversationParams,
): GetConversationParamsDTO => {
  return {
    conversation_id: params.conversationId,
  }
}

interface GetConversationResDTO {
  conversation: ConversationDTO
}

export interface GetConversationRes {
  conversation: Conversation
}

const fromGetConversationResDTO = (
  dto: GetConversationResDTO,
): GetConversationRes => {
  return {
    conversation: fromConversationDTO(dto.conversation),
  }
}

export const getConversation = async (params: GetConversationParams) => {
  const response = await request.get<GetConversationResDTO>('/conversation', {
    params: toGetConversationParamsDTO(params),
  })

  return fromGetConversationResDTO(response)
}
