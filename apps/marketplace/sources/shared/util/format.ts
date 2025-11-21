export function toAgo(timestamp: number): string {
  const now = Date.now()
  const diff = Math.floor((now - timestamp) / 1000) // 초 단위 차이

  if (diff < 60) {
    return `${diff}초 전`
  }

  const minutes = Math.floor(diff / 60)
  if (minutes < 60) {
    return `${minutes}분 전`
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours}시간 전`
  }

  const days = Math.floor(hours / 24)
  if (days < 7) {
    return `${days}일 전`
  }

  const weeks = Math.floor(days / 7)
  if (weeks < 5) {
    return `${weeks}주 전`
  }

  const months = Math.floor(days / 30)
  if (months < 12) {
    return `${months}개월 전`
  }

  const years = Math.floor(days / 365)
  return `${years}년 전`
}

export function toPrice(price: number): string {
  return price.toLocaleString()
}

export function toFullDate(timestamp: number): string {
  const date = new Date(timestamp)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  let hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')

  const isAM = hours < 12
  const ampm = isAM ? '오전' : '오후'

  // 한국식 12시간제
  hours = hours % 12
  if (hours === 0) hours = 12

  // 두 자리로 맞출 필요 있으면 pad 추가 가능
  const hh = String(hours).padStart(2, '0')

  return `${year}년 ${month}월 ${day}일 ${ampm} ${hh}:${minutes}`
}
