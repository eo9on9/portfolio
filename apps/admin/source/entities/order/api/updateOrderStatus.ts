import { fromOrderDTO, OrderDTO } from '@entities/order/api/dto/order'
import { Order } from '@entities/order/model/order'
import { KindOfOrderStatus } from '@entities/order/model/orderStatus'
import { request } from '@shared/api/request'

interface UpdateOrderStatusParams {
  id: string
  status: KindOfOrderStatus
}

type UpdateOrderStatusResDTO = OrderDTO

type UpdateOrderStatusRes = Order

const fromUpdateOrderStatusResDTO = (
  dto: UpdateOrderStatusResDTO,
): UpdateOrderStatusRes => {
  return fromOrderDTO(dto)
}

export const updateOrderStatus = async ({
  id,
  ...params
}: UpdateOrderStatusParams) => {
  const response = await request.put<UpdateOrderStatusResDTO>(`/orders/${id}`, {
    data: params,
  })

  return fromUpdateOrderStatusResDTO(response)
}
