import {
  fromMessageDTO,
  MessageDTO,
} from '@features/conversation/api/dto/message'
import { Message } from '@features/conversation/model/message'
import { request } from '@shared/api/request'

interface GetMessagesParamsDTO {
  conversation_id: string
}

export interface GetMessagesParams {
  conversationId: string
}

const toGetMessagesParamsDTO = (
  params: GetMessagesParams,
): GetMessagesParamsDTO => {
  return {
    conversation_id: params.conversationId,
  }
}

interface GetMessagesResDTO {
  messages: MessageDTO[]
}

export interface GetMessagesRes {
  messages: Message[]
}

const fromGetMessagesResDTO = (dto: GetMessagesResDTO): GetMessagesRes => {
  return {
    messages: dto.messages.map(message => fromMessageDTO(message)),
  }
}

export const getMessages = async (params: GetMessagesParams) => {
  const response = await request.get<GetMessagesResDTO>('/message/list', {
    params: toGetMessagesParamsDTO(params),
  })

  return fromGetMessagesResDTO(response)
}
