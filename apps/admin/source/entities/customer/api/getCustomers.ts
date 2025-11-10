import { Customer } from '@entities/customer/model/customer'
import { KindOfCustomerStatus } from '@entities/customer/model/customerStatus'
import { request } from '@shared/api/request'
import { CustomerDTO, fromCustomerDTO } from './dto/customer'

export type GetCustomersResDTO = {
  customers: CustomerDTO[]
  totalPages: number
}

export type GetCustomersRes = {
  customers: Customer[]
  totalPages: number
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
