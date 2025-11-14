import { fromOrderDTO, OrderDTO } from '@entities/order/api/dto/order'
import { Order } from '@entities/order/model/order'
import { request } from '@shared/api/request'

export type GetRecentOrdersResDTO = OrderDTO[]

export type GetRecentOrdersRes = Order[]

const fromGetRecentOrdersResDTO = (
  dto: GetRecentOrdersResDTO,
): GetRecentOrdersRes => {
  return dto.map(order => fromOrderDTO(order))
}

export const getRecentOrders = async () => {
  const response = await request.get<GetRecentOrdersResDTO>('/orders/recent')

  return fromGetRecentOrdersResDTO(response)
}
