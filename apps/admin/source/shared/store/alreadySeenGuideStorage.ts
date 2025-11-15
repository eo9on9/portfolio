const KEY = 'alreadySeenGuideStorage'

const get = () => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem(KEY)
      ? sessionStorage.getItem(KEY) === 'true'
      : null
  }

  return null
}

const set = (value: boolean) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(KEY, value.toString())
  }
}

export const alreadySeenGuideStorage = {
  get,
  set,
}
