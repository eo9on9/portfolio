export function toCompactNumber(num: number): string {
  if (num === null || num === undefined || isNaN(num)) return '-'

  const absNum = Math.abs(num)
  let formatted: string

  if (absNum >= 1_000_000_000) {
    formatted = (num / 1_000_000_000).toFixed(1) + 'B'
  } else if (absNum >= 1_000_000) {
    formatted = (num / 1_000_000).toFixed(1) + 'M'
  } else if (absNum >= 1_000) {
    formatted = (num / 1_000).toFixed(1) + 'K'
  } else {
    formatted = num.toString()
  }

  return formatted.replace(/\.0([KMB])$/, '$1')
}
