export function emptyToUndefined<T extends string>(value: T) {
  return (value === '' ? undefined : value) as T extends '' ? undefined : T
}
