import { KindOfCustomerStatus } from '@entities/customer/model/customerStatus'
import { ALL_SELECT_OPTION, WithAll } from '@shared/util/form'
import { useForm } from 'react-hook-form'

export interface CustomerFilterForm {
  name: string
  email: string
  phone: string
  status: WithAll<KindOfCustomerStatus>
  page: number
}

export const CUSTOMER_FILTER_FORM_DEFAULT_VALUES: CustomerFilterForm = {
  name: '',
  email: '',
  phone: '',
  status: ALL_SELECT_OPTION.value,
  page: 1,
}

export const useCustomerFilterForm = () => {
  return useForm<CustomerFilterForm>({
    defaultValues: CUSTOMER_FILTER_FORM_DEFAULT_VALUES,
  })
}
