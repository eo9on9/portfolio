export const STATE_CATEGORY = ['customer', 'order', 'product', 'sales'] as const

export type KindOfStateCategory = (typeof STATE_CATEGORY)[number]

export const STATE_CATEGORY_LABELS: Record<KindOfStateCategory, string> = {
  customer: '고객',
  order: '주문',
  product: '상품',
  sales: '매출',
}
