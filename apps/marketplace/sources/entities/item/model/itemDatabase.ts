import { Item } from '@entities/item/model/item'

export const ITEM_KEYS = [
  'woodenSword',
  'stoneSword',
  'steelSword',
  'demonSword',
  'dragonSword',
] as const

export type KindOfItemKey = (typeof ITEM_KEYS)[number]

export const ITEM_DATABASE: Record<KindOfItemKey, Item> = {
  woodenSword: {
    name: '나무 검',
    category: 'weapon',
    imageSrc: '/images/wooden-sword.png',
    grade: 'normal',
    description: '나무로 만들어진 검. (공격력 +10)',
  },
  stoneSword: {
    name: '돌 검',
    category: 'weapon',
    imageSrc: '/images/stone-sword.png',
    grade: 'normal',
    description: '돌로 만들어진 검. (공격력 +12)',
  },
  steelSword: {
    name: '강철 검',
    category: 'weapon',
    imageSrc: '/images/steel-sword.png',
    grade: 'rare',
    description: '강철로 만들어진 검. (공격력 +14)',
  },
  demonSword: {
    name: '악마의 검',
    category: 'weapon',
    imageSrc: '/images/demon-sword.png',
    grade: 'epic',
    description: '악마의 힘을 담은 검. (공격력 +20)',
  },
  dragonSword: {
    name: '용의 검',
    category: 'weapon',
    imageSrc: '/images/dragon-sword.png',
    grade: 'legendary',
    description: '용의 힘을 담은 검. (공격력 +24)',
  },
}
