import {
  ITEM_CATEGORY_LABELS,
  KindOfItemCategory,
} from '@entities/item/model/itemCategory'
import { Badge } from '@repo/ui-common'

interface ItemCategoryBadgeProps {
  category: KindOfItemCategory
}

export const ItemCategoryBadge = ({ category }: ItemCategoryBadgeProps) => {
  return (
    <Badge className="border border-gray-200">
      {ITEM_CATEGORY_LABELS[category]}
    </Badge>
  )
}
