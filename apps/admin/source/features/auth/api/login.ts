import { fromUserDTO } from '@entities/user/api/dto/user'
import { User } from '@entities/user/model/user'
import { request } from '@shared/api/request'

export interface LoginParams {
  email: string
  password: string
}

interface LoginResDTO {
  accessToken: string
  user: {
    name: string
    email: string
    phone: string
    role: string
  }
}

export interface LoginRes {
  accessToken: string
  user: User
}

const fromLoginResDTO = (dto: LoginResDTO): LoginRes => {
  return {
    accessToken: dto.accessToken,
    user: fromUserDTO(dto.user),
  }
}

export const login = async (params: LoginParams): Promise<LoginRes> => {
  const response = await request.post<LoginResDTO>('/auth/login', {
    data: params,
  })

  return fromLoginResDTO(response)
}
