type Option = {
  label: string
  value: string
}

export const ALL_LABEL = '전체'

export const ALL_VALUE = '*'

export const ALL_OPTION = {
  label: ALL_LABEL,
  value: ALL_VALUE,
} as const

export type WithAll<T> = T | typeof ALL_OPTION.value

export const withAll = (options: Option[]) => {
  return [ALL_OPTION as Option, ...options]
}

export function allToUndefined<T extends string>(value: T) {
  return (value === ALL_VALUE ? undefined : value) as T extends typeof ALL_VALUE
    ? undefined
    : T
}
