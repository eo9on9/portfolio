import { Customer } from '@entities/customer/model/customer'
import { KindOfCustomerStatus } from '@entities/customer/model/customerStatus'
import { request } from '@shared/api/request'

export interface CustomerDTO {
  id: number
  name: string
  email: string
  phone: string
  orders: number
  spent: number
  status: string
}

export type GetCustomersResDTO = {
  customers: CustomerDTO[]
  totalPages: number
}

export type GetCustomersRes = {
  customers: Customer[]
  totalPages: number
}

const fromCustomerDTO = (dto: CustomerDTO): Customer => {
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

const fromGetCustomersResDTO = (dto: GetCustomersResDTO): GetCustomersRes => {
  return {
    customers: dto.customers.map(customer => fromCustomerDTO(customer)),
    totalPages: dto.totalPages,
  }
}

export interface GetCustomersParams {
  name?: string
  email?: string
  phone?: string
  status?: KindOfCustomerStatus
  page: number
}

export const getCustomers = async (
  params: GetCustomersParams,
): Promise<GetCustomersRes> => {
  const response = await request.get<GetCustomersResDTO>('/customers', {
    params,
  })
  return fromGetCustomersResDTO(response)
}
