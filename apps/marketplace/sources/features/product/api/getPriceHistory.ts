import { request } from '@shared/api/request'

interface GetPriceHistoryResponseDTO {
  price_history: {
    date: Date
    price: number
  }[]
  average_price: number
}

interface GetPriceHistoryResponse {
  priceHistory: {
    date: Date
    price: number
  }[]
  averagePrice: number
}

const fromGetPriceHistoryResponseDTO = (
  dto: GetPriceHistoryResponseDTO,
): GetPriceHistoryResponse => {
  return {
    priceHistory: dto.price_history.map(price => ({
      date: new Date(price.date),
      price: price.price,
    })),
    averagePrice: dto.average_price,
  }
}

export const getPriceHistory = async () => {
  const response = await request.get<GetPriceHistoryResponseDTO>(
    '/product/price-history',
  )

  return fromGetPriceHistoryResponseDTO(response)
}
