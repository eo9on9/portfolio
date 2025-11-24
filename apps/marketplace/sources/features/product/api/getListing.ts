import { KindOfItemKey } from '@entities/item/model/itemKey'
import { fromProductDTO, ProductDTO } from '@features/product/api/dto/product'
import { Product } from '@features/product/model/product'
import { request } from '@shared/api/request'

interface GetListingParamsDTO {
  item_key: string
}

export interface GetListingParams {
  itemKey: KindOfItemKey
}

const toGetListingParamsDTO = (
  params: GetListingParams,
): GetListingParamsDTO => {
  return {
    item_key: params.itemKey,
  }
}

interface GetListingResDTO {
  products: ProductDTO[]
}

export interface GetListingRes {
  products: Product[]
}

const fromGetListingResDTO = (dto: GetListingResDTO): GetListingRes => {
  return {
    products: dto.products.map(product => fromProductDTO(product)),
  }
}

export const getListing = async (params: GetListingParams) => {
  const response = await request.get<GetListingResDTO>('/product/listing', {
    params: toGetListingParamsDTO(params),
  })

  return fromGetListingResDTO(response)
}
