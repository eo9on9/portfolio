import { KindOfUserRole } from '@entities/user/model/userRole'

export interface User {
  name: string
  email: string
  phone: string
  role: KindOfUserRole
}
