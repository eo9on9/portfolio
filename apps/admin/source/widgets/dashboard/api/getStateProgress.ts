import { request } from '@shared/api/request'
import { KindOfStateCategory } from '@widgets/dashboard/model/stateCategory'

export type GetStateProgressResDTO = Array<{
  name: string
  sales: number
  order: number
}>

export type GetStateProgressRes = Array<
  Partial<Record<KindOfStateCategory, number>> & { name: string }
>

const fromGetStateProgressResDTO = (
  dto: GetStateProgressResDTO,
): GetStateProgressRes => {
  return dto.map(item => ({
    name: item.name,
    order: item.order,
    sales: item.sales,
  }))
}

export const getStateProgress = async () => {
  const response = await request.get<GetStateProgressResDTO>(
    '/dashboard/state-progress',
  )

  return fromGetStateProgressResDTO(response)
}
