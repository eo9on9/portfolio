import { KindOfItemCategory } from '@entities/item/model/itemCategory'
import { KindOfItemGrade } from '@entities/item/model/itemGrade'
import { fromProductDTO, ProductDTO } from '@features/product/api/dto/product'
import { Product } from '@features/product/model/product'
import { KindOfProductType } from '@features/product/model/productType'
import { request } from '@shared/api/request'

export interface SearchProductsParams {
  name?: string
  category?: KindOfItemCategory
  grade?: KindOfItemGrade
  type?: KindOfProductType
  page: number
}

interface SearchProductsResDTO {
  products: ProductDTO[]
  totalPages: number
  page: number
}

export interface SearchProductsRes {
  products: Product[]
  totalPages: number
  page: number
}

const fromSearchProductsResDTO = (
  dto: SearchProductsResDTO,
): SearchProductsRes => {
  return {
    products: dto.products.map(product => fromProductDTO(product)),
    totalPages: dto.totalPages,
    page: dto.page,
  }
}

export const searchProducts = async (params: SearchProductsParams) => {
  const response = await request.get<SearchProductsResDTO>('/product/search', {
    params: params,
  })

  return fromSearchProductsResDTO(response)
}
