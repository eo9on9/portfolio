import { KindOfItemKey } from '@entities/item/model/itemKey'
import { Product } from '@features/product/model/product'
import { KindOfProductType } from '@features/product/model/productType'

export interface ProductDTO {
  product_id: string
  item_key: string
  type: string
  listed_by: string
  price: number
  amount: number
  created_at: number
}

export const fromProductDTO = (dto: ProductDTO): Product => {
  return {
    productId: dto.product_id,
    itemKey: dto.item_key as KindOfItemKey,
    type: dto.type as KindOfProductType,
    listedBy: dto.listed_by,
    price: dto.price,
    amount: dto.amount,
    createdAt: dto.created_at,
  }
}
