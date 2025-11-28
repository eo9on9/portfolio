import {
  fromMessageDTO,
  MessageDTO,
} from '@features/conversation/api/dto/message'
import { Message } from '@features/conversation/model/message'
import { request } from '@shared/api/request'

interface SendMessageParamsDTO {
  partner: string
  product_id: string
  content: string
}

interface SendMessageParams {
  partner: string
  productId: string
  content: string
}

const toSendMessageParamsDTO = (
  params: SendMessageParams,
): SendMessageParamsDTO => {
  return {
    partner: params.partner,
    product_id: params.productId,
    content: params.content,
  }
}

interface SendMessageResDTO {
  messages: MessageDTO[]
}

interface SendMessageRes {
  messages: Message[]
}

const fromSendMessageResDTO = (dto: SendMessageResDTO): SendMessageRes => {
  return {
    messages: dto.messages.map(message => fromMessageDTO(message)),
  }
}

export const sendMessage = async (params: SendMessageParams) => {
  const response = await request.post<SendMessageResDTO>('/message', {
    data: toSendMessageParamsDTO(params),
  })

  setTimeout(() => {
    request.post<SendMessageResDTO>('/message/auto-reply', {
      data: toSendMessageParamsDTO(params),
    })
  }, 1000)

  return fromSendMessageResDTO(response)
}
