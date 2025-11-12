import { fromUserDTO, UserDTO } from '@entities/user/api/dto/user'
import { User } from '@entities/user/model/user'
import { request } from '@shared/api/request'

type GetProfileResDTO = UserDTO

export type GetProfileRes = User

const fromGetProfileResDTO = (dto: GetProfileResDTO): GetProfileRes => {
  return fromUserDTO(dto)
}

export const getProfile = async (): Promise<GetProfileRes> => {
  const response = await request.get<GetProfileResDTO>('/profile')

  return fromGetProfileResDTO(response)
}
