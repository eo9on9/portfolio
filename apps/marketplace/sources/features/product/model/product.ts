import { KindOfItemKey } from '@entities/item/model/itemKey'
import { KindOfProductType } from '@features/product/model/productType'

export interface Product {
  id: string
  itemKey: KindOfItemKey
  type: KindOfProductType
  listedBy: string
  price: number
  amount: number
  createdAt: number
}
