import { KindOfOrderStatus } from '@entities/order/model/orderStatus'

export interface Order {
  id: string
  customer: string
  product: string
  quantity: number
  amount: number
  orderedAt: number
  status: KindOfOrderStatus
}
