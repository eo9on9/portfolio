import { KindOfItemKey } from '@entities/item/model/itemKey'
import { fromProductDTO, ProductDTO } from '@features/product/api/dto/product'
import { Product } from '@features/product/model/product'
import { request } from '@shared/api/request'

interface GetItemListingParamsDTO {
  item_key: string
}

export interface GetItemListingParams {
  itemKey: KindOfItemKey
}

const toGetItemListingParamsDTO = (
  params: GetItemListingParams,
): GetItemListingParamsDTO => {
  return {
    item_key: params.itemKey,
  }
}

interface GetItemListingResDTO {
  products: ProductDTO[]
}

export interface GetItemListingRes {
  products: Product[]
}

const fromGetItemListingResDTO = (
  dto: GetItemListingResDTO,
): GetItemListingRes => {
  return {
    products: dto.products.map(product => fromProductDTO(product)),
  }
}

export const getItemListing = async (params: GetItemListingParams) => {
  const response = await request.get<GetItemListingResDTO>('/product/listing', {
    params: toGetItemListingParamsDTO(params),
  })

  return fromGetItemListingResDTO(response)
}
