import { fromProductDTO, ProductDTO } from '@features/product/api/dto/product'
import { Product } from '@features/product/model/product'
import { KindOfProductType } from '@features/product/model/productType'
import { request } from '@shared/api/request'

interface GetProductsParams {
  type?: KindOfProductType
  page: number
}

interface GetProductsResDTO {
  products: ProductDTO[]
  totalPages: number
  page: number
}

export interface GetProductsRes {
  products: Product[]
  totalPages: number
  page: number
}

const fromGetProductsResDTO = (dto: GetProductsResDTO): GetProductsRes => {
  return {
    products: dto.products.map(product => fromProductDTO(product)),
    totalPages: dto.totalPages,
    page: dto.page,
  }
}

export const getProducts = async ({ type, page }: GetProductsParams) => {
  const response = await request.get<GetProductsResDTO>('/products', {
    params: { type, page },
  })

  return fromGetProductsResDTO(response)
}
