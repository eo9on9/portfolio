export const ORDER_STATUS = [
  'preparing',
  'shipping',
  'delivered',
  'canceled',
] as const

export type KindOfOrderStatus = (typeof ORDER_STATUS)[number]

export const ORDER_STATUS_LABELS: Record<KindOfOrderStatus, string> = {
  preparing: '준비중',
  shipping: '배송중',
  delivered: '배송완료',
  canceled: '취소됨',
}
