import { KindOfOrderStatus } from '@entities/order/model/orderStatus'
import { ALL_SELECT_OPTION, WithAll } from '@shared/util/form'
import { useForm } from 'react-hook-form'

export interface OrderFilterForm {
  query: string
  status: WithAll<KindOfOrderStatus>
  page: number
}

export const ORDER_FILTER_FORM_DEFAULT_VALUES: OrderFilterForm = {
  query: '',
  status: ALL_SELECT_OPTION.value,
  page: 1,
}

export const useOrderFilterForm = () => {
  return useForm<OrderFilterForm>({
    defaultValues: ORDER_FILTER_FORM_DEFAULT_VALUES,
  })
}
