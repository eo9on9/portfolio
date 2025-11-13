import { Customer } from '@entities/customer/model/customer'
import { KindOfCustomerStatus } from '@entities/customer/model/customerStatus'
import { toPhone, toPhoneNumber } from '@shared/util/format'

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
    phone: toPhone(dto.phone),
    orders: dto.orders,
    spent: dto.spent,
    status: dto.status as KindOfCustomerStatus,
  }
}

export const toCustomerDTO = (
  customer: Partial<Customer>,
): Partial<CustomerDTO> => {
  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone && toPhoneNumber(customer.phone),
    orders: customer.orders,
    spent: customer.spent,
    status: customer.status,
  }
}
