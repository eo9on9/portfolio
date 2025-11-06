import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  type LucideIcon,
} from 'lucide-react'

export const SUMMARY_STATE_CATEGORY = [
  'customer',
  'order',
  'product',
  'sales',
] as const

export type KindOfSummaryStateCategory = (typeof SUMMARY_STATE_CATEGORY)[number]

export const SUMMARY_STATE_CATEGORY_LABELS: Record<
  KindOfSummaryStateCategory,
  string
> = {
  customer: '고객',
  order: '주문',
  product: '상품',
  sales: '매출',
}

export const SUMMARY_STATE_CATEGORY_ICONS: Record<
  KindOfSummaryStateCategory,
  LucideIcon
> = {
  customer: Users,
  order: ShoppingCart,
  product: Package,
  sales: DollarSign,
}
