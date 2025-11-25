export const ITEM_KEYS = [
  'wooden_sword',
  'stone_sword',
  'steel_sword',
  'demon_sword',
  'dragon_sword',
  'cloth_armor',
  'leather_armor',
  'metal_armor',
  'dragon_armor',
  'hp_potion',
  'mp_potion',
  'ring',
  'crown',
  'ore',
  'scroll',
] as const

export type KindOfItemKey = (typeof ITEM_KEYS)[number]
