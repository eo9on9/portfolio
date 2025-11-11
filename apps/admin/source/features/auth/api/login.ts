import { fromUserDTO } from '@entities/user/api/dto/user'
import { User } from '@entities/user/model/user'
import { request } from '@shared/api/request'

export interface LoginParams {
  email: string
  password: string
}

interface LoginResDTO {
  token: string
  user: {
    id: string
    email: string
    name: string
    role: string
  }
}

export interface LoginRes {
  token: string
  user: User
}

const fromLoginResDTO = (dto: LoginResDTO): LoginRes => {
  return {
    token: dto.token,
    user: fromUserDTO(dto.user),
  }
}

export const login = async (params: LoginParams): Promise<LoginRes> => {
  const response = await request.post<LoginResDTO>('/auth/login', {
    data: params,
  })

  return fromLoginResDTO(response)
}
