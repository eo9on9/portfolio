import { fromOrderDTO, OrderDTO } from '@entities/order/api/dto/order'
import { Order } from '@entities/order/model/order'
import { KindOfOrderStatus } from '@entities/order/model/orderStatus'
import { request } from '@shared/api/request'

interface GetOrdersParams {
  page: number
  query?: string
  status?: KindOfOrderStatus
}

interface GetOrdersResDTO {
  totalPages: number
  orders: OrderDTO[]
}

interface GetOrdersRes {
  totalPages: number
  orders: Order[]
}

const fromGetOrdersResDTO = (dto: GetOrdersResDTO): GetOrdersRes => {
  return {
    totalPages: dto.totalPages,
    orders: dto.orders.map(order => fromOrderDTO(order)),
  }
}

export const getOrders = async (params: GetOrdersParams) => {
  const response = await request.get<GetOrdersResDTO>('/orders', {
    params,
  })

  return fromGetOrdersResDTO(response)
}
