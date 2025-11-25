import { fromProductDTO, ProductDTO } from '@features/product/api/dto/product'
import { Product } from '@features/product/model/product'
import { request } from '@shared/api/request'

interface GetMyListingResDTO {
  products: ProductDTO[]
}

export interface GetMyListingRes {
  products: Product[]
}

const fromGetMyListingResDTO = (dto: GetMyListingResDTO): GetMyListingRes => {
  return {
    products: dto.products.map(product => fromProductDTO(product)),
  }
}

export const getMyListing = async () => {
  const response = await request.get<GetMyListingResDTO>('/product/listing/my')

  return fromGetMyListingResDTO(response)
}
