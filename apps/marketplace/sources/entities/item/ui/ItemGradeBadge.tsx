import {
  ITEM_GRADE_LABELS,
  KindOfItemGrade,
} from '@entities/item/model/itemGrade'
import { Badge } from '@repo/ui-common'
import { cva } from 'class-variance-authority'

interface ItemGradeBadgeProps {
  grade: KindOfItemGrade
}

export const ItemGradeBadge = ({ grade }: ItemGradeBadgeProps) => {
  return (
    <Badge className={variants({ grade })}>{ITEM_GRADE_LABELS[grade]}</Badge>
  )
}

const variants = cva(null, {
  variants: {
    grade: {
      normal: 'bg-gray-200 text-gray-800',
      rare: 'bg-yellow-200 text-yellow-800',
      epic: 'bg-purple-200 text-purple-800',
      legendary: 'bg-red-200 text-red-800',
    },
  },
})
