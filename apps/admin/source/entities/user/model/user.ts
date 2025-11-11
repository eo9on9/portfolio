import { KindOfUserRole } from '@entities/user/model/userRole'

export interface User {
  id: string
  email: string
  name: string
  role: KindOfUserRole
}
