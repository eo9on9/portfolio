import { fromProductDTO, ProductDTO } from '@features/product/api/dto/product'
import { Product } from '@features/product/model/product'
import { request } from '@shared/api/request'

interface GetProductParams {
  id: string
}

interface GetProductResDTO {
  product: ProductDTO
}

interface GetProductRes {
  product: Product
}

const fromGetProductResDTO = (dto: GetProductResDTO): GetProductRes => {
  return {
    product: fromProductDTO(dto.product),
  }
}

export const getProduct = async (params: GetProductParams) => {
  const response = await request.get<GetProductResDTO>('/product', {
    params,
  })

  return fromGetProductResDTO(response)
}
