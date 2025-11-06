import { request } from '@shared/api/request'

export type GetSalesRateResDTO = Array<{
  name: string
  value: number
}>

export type GetSalesRateRes = Array<{
  name: string
  value: number
}>

const fromGetSalesRateResDTO = (dto: GetSalesRateResDTO): GetSalesRateRes => {
  return dto.map(item => ({
    name: item.name,
    value: item.value,
  }))
}

export const getSalesRate = async () => {
  const response = await request.get<GetSalesRateResDTO>('/sales/rate')

  return fromGetSalesRateResDTO(response)
}
