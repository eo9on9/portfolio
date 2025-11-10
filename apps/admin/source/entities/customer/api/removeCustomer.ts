import {
  CustomerDTO,
  fromCustomerDTO,
} from '@entities/customer/api/dto/customer'
import { Customer } from '@entities/customer/model/customer'
import { request } from '@shared/api/request'

interface RemoveCustomerParams {
  id: number
}

type RemoveCustomerResDTO = CustomerDTO

const fromRemoveCustomerResDTO = (dto: RemoveCustomerResDTO): Customer => {
  return fromCustomerDTO(dto)
}

export const removeCustomer = async (
  params: RemoveCustomerParams,
): Promise<Customer> => {
  const response = await request.delete<RemoveCustomerResDTO>(`/customers`, {
    params,
  })

  return fromRemoveCustomerResDTO(response)
}
