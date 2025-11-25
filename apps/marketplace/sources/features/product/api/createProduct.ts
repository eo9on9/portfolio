import { KindOfItemKey } from '@entities/item/model/itemKey'
import { fromProductDTO, ProductDTO } from '@features/product/api/dto/product'
import { Product } from '@features/product/model/product'
import { KindOfProductType } from '@features/product/model/productType'
import { request } from '@shared/api/request'

interface CreateProductParamsDTO {
  item_key: string
  type: string
  price: number
  amount: number
}

export interface CreateProductParams {
  itemKey: KindOfItemKey
  type: KindOfProductType
  price: number
  amount: number
}

const toCreateProductParamsDTO = (
  params: CreateProductParams,
): CreateProductParamsDTO => {
  return {
    item_key: params.itemKey,
    type: params.type,
    price: params.price,
    amount: params.amount,
  }
}

interface CreateProductResponseDTO {
  product: ProductDTO
}

export interface CreateProductResponse {
  product: Product
}

const fromCreateProductResponseDTO = (
  dto: CreateProductResponseDTO,
): CreateProductResponse => {
  return {
    product: fromProductDTO(dto.product),
  }
}

export const createProduct = async (params: CreateProductParams) => {
  const response = await request.post<CreateProductResponseDTO>('/product', {
    data: toCreateProductParamsDTO(params),
  })

  return fromCreateProductResponseDTO(response)
}
