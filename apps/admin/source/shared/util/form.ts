import { SelectOption } from '@repo/ui-common'

export const ALL_SELECT_OPTION = {
  label: '전체',
  value: '*',
} as const

export type WithAll<T> = T | typeof ALL_SELECT_OPTION.value

export const withAll = (options: SelectOption[]) => {
  return [ALL_SELECT_OPTION as SelectOption, ...options]
}

export function allToUndefined<T extends string>(value: T) {
  return (
    value === ALL_SELECT_OPTION.value ? undefined : value
  ) as T extends typeof ALL_SELECT_OPTION.value ? undefined : T
}
