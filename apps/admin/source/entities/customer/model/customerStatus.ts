export const CUSTOMER_STATUS = ['active', 'inactive'] as const

export type KindOfCustomerStatus = (typeof CUSTOMER_STATUS)[number]

export const CUSTOMER_STATUS_LABELS: Record<KindOfCustomerStatus, string> = {
  active: '활성',
  inactive: '비활성',
}
