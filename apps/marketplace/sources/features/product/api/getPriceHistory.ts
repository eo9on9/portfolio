import { KindOfItemKey } from '@entities/item/model/itemKey'
import { request } from '@shared/api/request'

interface GetPriceHistoryParamsDTO {
  item_key: string
}

interface GetPriceHistoryParams {
  itemKey: KindOfItemKey
}

const toGetPriceHistoryParamsDTO = (
  params: GetPriceHistoryParams,
): GetPriceHistoryParamsDTO => {
  return {
    item_key: params.itemKey,
  }
}

interface GetPriceHistoryResponseDTO {
  history: { date: number; price: number }[]
  average: number
}

interface GetPriceHistoryResponse {
  history: { date: number; price: number }[]
  average: number
}

const fromGetPriceHistoryResponseDTO = (
  dto: GetPriceHistoryResponseDTO,
): GetPriceHistoryResponse => {
  return {
    history: dto.history,
    average: dto.average,
  }
}

export const getPriceHistory = async (params: GetPriceHistoryParams) => {
  const response = await request.get<GetPriceHistoryResponseDTO>(
    '/product/price-history',
    {
      params: toGetPriceHistoryParamsDTO(params),
    },
  )

  return fromGetPriceHistoryResponseDTO(response)
}
