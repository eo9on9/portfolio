const KEY = 'guideStorage'

const INITIAL_VALUE = {
  isFirstVisitApp: true,
  isFirstVisitConversation: true,
}

const get = () => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem(KEY)
      ? JSON.parse(sessionStorage.getItem(KEY)!)
      : INITIAL_VALUE
  }

  return INITIAL_VALUE
}

const set = (key: keyof typeof INITIAL_VALUE, value: boolean) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(KEY, JSON.stringify({ ...get(), [key]: value }))
  }
}

export const guideStorage = {
  get,
  set,
}
