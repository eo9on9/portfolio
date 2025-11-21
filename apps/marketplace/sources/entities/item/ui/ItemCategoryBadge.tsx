import {
  ITEM_CATEGORY_LABELS,
  KindOfItemCategory,
} from '@entities/item/model/itemCategory'
import { Badge } from '@shared/ui/Badge'
import { cn } from '@shared/util/cn'

interface ItemCategoryBadgeProps {
  category: KindOfItemCategory
}

export const ItemCategoryBadge = ({ category }: ItemCategoryBadgeProps) => {
  return <Badge className={badgeTw}>{ITEM_CATEGORY_LABELS[category]}</Badge>
}

const badgeTw = cn`border border-gray-200`
