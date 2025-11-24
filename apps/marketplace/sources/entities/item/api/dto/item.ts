import { Item } from '@entities/item/model/item'
import { KindOfItemCategory } from '@entities/item/model/itemCategory'
import { KindOfItemGrade } from '@entities/item/model/itemGrade'

export interface ItemDTO {
  name: string
  category: string
  image_src: string
  grade: string
  description: string
}

export const fromItemDTO = (dto: ItemDTO): Item => {
  return {
    name: dto.name,
    category: dto.category as KindOfItemCategory,
    imageSrc: dto.image_src,
    grade: dto.grade as KindOfItemGrade,
    description: dto.description,
  }
}
