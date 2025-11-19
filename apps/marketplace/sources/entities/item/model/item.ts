import { KindOfItemCategory } from '@entities/item/model/itemCategory'
import { KindOfItemGrade } from '@entities/item/model/itemGrade'

export interface Item {
  name: string
  category: KindOfItemCategory
  imageSrc: string
  grade: KindOfItemGrade
  description: string
}
