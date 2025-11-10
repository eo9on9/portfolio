import {
  CustomerDTO,
  fromCustomerDTO,
} from '@entities/customer/api/dto/customer'
import { Customer } from '@entities/customer/model/customer'
import { KindOfCustomerStatus } from '@entities/customer/model/customerStatus'
import { request } from '@shared/api/request'

export interface UpdateCustomerParams {
  id: number
  name?: string
  email?: string
  phone?: string
  status?: KindOfCustomerStatus
}

type UpdateCustomerResDTO = CustomerDTO

const fromUpdateCustomerResDTO = (dto: UpdateCustomerResDTO): Customer => {
  return fromCustomerDTO(dto)
}

export const updateCustomer = async ({
  id,
  ...params
}: UpdateCustomerParams): Promise<Customer> => {
  const response = await request.put<UpdateCustomerResDTO>(`/customers/${id}`, {
    data: params,
  })
  return fromUpdateCustomerResDTO(response)
}
