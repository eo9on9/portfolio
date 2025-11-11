export const USER_ROLE = ['admin', 'manager'] as const

export type KindOfUserRole = (typeof USER_ROLE)[number]

export const USER_ROLE_LABELS: Record<KindOfUserRole, string> = {
  admin: '관리자',
  manager: '매니저',
}
