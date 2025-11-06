import { KindOfOrderStatus } from '@entities/order/model/orderStatus'
import { request } from '@shared/api/request'

export type GetRecentOrdersResDTO = Array<{
  orderId: string
  customer: string
  productName: string
  amount: number
  status: string
}>

export type GetRecentOrdersRes = Array<{
  orderId: string
  customer: string
  productName: string
  amount: number
  status: KindOfOrderStatus
}>

const fromGetRecentOrdersResDTO = (
  dto: GetRecentOrdersResDTO,
): GetRecentOrdersRes => {
  return dto.map(item => ({
    orderId: item.orderId,
    customer: item.customer,
    productName: item.productName,
    amount: item.amount,
    status: item.status as KindOfOrderStatus,
  }))
}

export const getRecentOrders = async () => {
  const response = await request.get<GetRecentOrdersResDTO>('/orders/recent')

  return fromGetRecentOrdersResDTO(response)
}
