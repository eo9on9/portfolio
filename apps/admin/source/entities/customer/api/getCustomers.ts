import {
  CustomerDTO,
  fromCustomerDTO,
  toCustomerDTO,
} from '@entities/customer/api/dto/customer'
import { Customer } from '@entities/customer/model/customer'
import { KindOfCustomerStatus } from '@entities/customer/model/customerStatus'
import { request } from '@shared/api/request'

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

export const getCustomers = async ({
  page,
  ...params
}: GetCustomersParams): Promise<GetCustomersRes> => {
  const response = await request.get<GetCustomersResDTO>('/customers', {
    params: { page, ...toCustomerDTO(params) },
  })
  return fromGetCustomersResDTO(response)
}
