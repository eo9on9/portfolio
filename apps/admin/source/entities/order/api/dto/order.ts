import { Order } from '@entities/order/model/order'
import { KindOfOrderStatus } from '@entities/order/model/orderStatus'

export interface OrderDTO {
  id: string
  customer: string
  product: string
  quantity: number
  amount: number
  orderedAt: number
  status: string
}

export const fromOrderDTO = (dto: OrderDTO): Order => {
  return {
    id: dto.id,
    customer: dto.customer,
    product: dto.product,
    quantity: dto.quantity,
    amount: dto.amount,
    orderedAt: dto.orderedAt,
    status: dto.status as KindOfOrderStatus,
  }
}
