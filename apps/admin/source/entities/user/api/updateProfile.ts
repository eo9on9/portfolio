import { fromUserDTO, UserDTO } from '@entities/user/api/dto/user'
import { User } from '@entities/user/model/user'
import { KindOfUserRole } from '@entities/user/model/userRole'
import { request } from '@shared/api/request'

interface UpdateProfileParams {
  name?: string
  phone?: string
  role?: KindOfUserRole
}

type UpdateProfileResDTO = UserDTO

export type UpdateProfileRes = User

const fromUpdateProfileResDTO = (
  dto: UpdateProfileResDTO,
): UpdateProfileRes => {
  return fromUserDTO(dto)
}

export const updateProfile = async (
  params: UpdateProfileParams,
): Promise<UpdateProfileRes> => {
  const response = await request.put<UpdateProfileResDTO>('/profile', {
    data: params,
  })

  return fromUpdateProfileResDTO(response)
}
