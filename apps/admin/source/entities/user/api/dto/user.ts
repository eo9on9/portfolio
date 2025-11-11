import { User } from '@entities/user/model/user'
import { KindOfUserRole } from '@entities/user/model/userRole'

export interface UserDTO {
  id: string
  email: string
  name: string
  role: string
}

export const fromUserDTO = (dto: UserDTO): User => {
  return {
    id: dto.id,
    email: dto.email,
    name: dto.name,
    role: dto.role as KindOfUserRole,
  }
}
