import { User } from '@entities/user/model/user'
import { KindOfUserRole } from '@entities/user/model/userRole'
import { toPhone, toPhoneNumber } from '@shared/util/format'

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
    phone: toPhone(dto.phone),
    role: dto.role as KindOfUserRole,
  }
}

export const toUserDTO = (user: Partial<User>): Partial<UserDTO> => {
  return {
    name: user.name,
    email: user.email,
    phone: user.phone && toPhoneNumber(user.phone),
    role: user.role,
  }
}
