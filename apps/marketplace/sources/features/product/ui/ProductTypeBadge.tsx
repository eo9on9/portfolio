import {
  KindOfProductType,
  PRODUCT_TYPE_LABELS,
} from '@features/product/model/productType'
import { Badge } from '@shared/ui/Badge'
import { cva } from 'class-variance-authority'

interface ProductTypeBadgeProps {
  type: KindOfProductType
}

export const ProductTypeBadge = ({ type }: ProductTypeBadgeProps) => {
  return (
    <Badge className={variants({ type })}>{PRODUCT_TYPE_LABELS[type]}</Badge>
  )
}

const variants = cva(null, {
  variants: {
    type: {
      buy: 'bg-gray-200 text-gray-800',
      sell: 'bg-gray-800 text-white',
    },
  },
})
