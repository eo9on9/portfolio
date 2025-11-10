import { Customer } from '@entities/customer/model/customer'
import { KindOfCustomerStatus } from '@entities/customer/model/customerStatus'

export interface CustomerDTO {
  id: number
  name: string
  email: string
  phone: string
  orders: number
  spent: number
  status: string
}

export const fromCustomerDTO = (dto: CustomerDTO): Customer => {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    phone: dto.phone,
    orders: dto.orders,
    spent: dto.spent,
    status: dto.status as KindOfCustomerStatus,
  }
}
