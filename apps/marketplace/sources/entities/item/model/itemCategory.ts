export const ITEM_CATEGORY = [
  'weapon',
  'armor',
  'accessory',
  'consumable',
  'material',
] as const

export type KindOfItemCategory = (typeof ITEM_CATEGORY)[number]

export const ITEM_CATEGORY_LABELS: Record<KindOfItemCategory, string> = {
  weapon: '무기',
  armor: '방어구',
  accessory: '악세서리',
  consumable: '소모품',
  material: '재료',
}
