import { fromProductDTO, ProductDTO } from '@features/product/api/dto/product'
import { Product } from '@features/product/model/product'
import { request } from '@shared/api/request'

interface GetProductParamsDTO {
  product_id: string
}

export interface GetProductParams {
  productId: string
}

const toGetProductParamsDTO = (
  params: GetProductParams,
): GetProductParamsDTO => {
  return {
    product_id: params.productId,
  }
}

interface GetProductResDTO {
  product: ProductDTO
}

export interface GetProductRes {
  product: Product
}

const fromGetProductResDTO = (dto: GetProductResDTO): GetProductRes => {
  return {
    product: fromProductDTO(dto.product),
  }
}

export const getProduct = async (params: GetProductParams) => {
  const response = await request.get<GetProductResDTO>('/product', {
    params: toGetProductParamsDTO(params),
  })

  return fromGetProductResDTO(response)
}
