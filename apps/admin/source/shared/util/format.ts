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

export function toDate(timestamp: number): string {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function toPhone(phone: string): string {
  return phone.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3')
}

export function toPhoneNumber(phone: string): string {
  return phone.replace(/-/g, '')
}
