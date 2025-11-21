export const PRODUCT_TYPE = ['buy', 'sell'] as const

export type KindOfProductType = (typeof PRODUCT_TYPE)[number]

export const PRODUCT_TYPE_LABELS: Record<KindOfProductType, string> = {
  sell: '판매',
  buy: '구매',
}
