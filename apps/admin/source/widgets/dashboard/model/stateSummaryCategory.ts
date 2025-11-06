export const STATE_SUMMARY_CATEGORY = [
  'customer',
  'order',
  'product',
  'sales',
] as const

export type KindOfSummaryStateCategory = (typeof STATE_SUMMARY_CATEGORY)[number]

export const STATE_SUMMARY_CATEGORY_LABELS: Record<
  KindOfSummaryStateCategory,
  string
> = {
  customer: '고객',
  order: '주문',
  product: '상품',
  sales: '매출',
}
