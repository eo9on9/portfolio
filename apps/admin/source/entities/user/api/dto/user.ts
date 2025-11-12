import { User } from '@entities/user/model/user'
import { KindOfUserRole } from '@entities/user/model/userRole'

export interface UserDTO {
  name: string
  email: string
  phone: string
  role: string
}

export const fromUserDTO = (dto: UserDTO): User => {
  return {
    name: dto.name,
    email: dto.email,
    phone: dto.phone,
    role: dto.role as KindOfUserRole,
  }
}
