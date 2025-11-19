export const ITEM_GRADE = ['normal', 'rare', 'epic', 'legendary'] as const

export type KindOfItemGrade = (typeof ITEM_GRADE)[number]

export const ITEM_GRADE_LABELS: Record<KindOfItemGrade, string> = {
  normal: '일반',
  rare: '레어',
  epic: '에픽',
  legendary: '전설',
}
