import {
  CustomerDTO,
  fromCustomerDTO,
} from '@entities/customer/api/dto/customer'
import { Customer } from '@entities/customer/model/customer'
import { request } from '@shared/api/request'

export interface CreateCustomerParams {
  name: string
  email: string
  phone: string
}

type CreateCustomerResDTO = CustomerDTO

const fromCreateCustomerResDTO = (dto: CreateCustomerResDTO): Customer => {
  return fromCustomerDTO(dto)
}

export const createCustomer = async (
  params: CreateCustomerParams,
): Promise<Customer> => {
  const response = await request.post<CreateCustomerResDTO>('/customers', {
    data: params,
  })

  return fromCreateCustomerResDTO(response)
}
