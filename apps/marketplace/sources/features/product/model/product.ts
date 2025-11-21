import { KindOfItemKey } from '@entities/item/model/itemDatabase'
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
