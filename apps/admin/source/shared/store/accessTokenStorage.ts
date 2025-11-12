const KEY = 'accessToken'

const get = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(KEY)
  }

  return null
}

const set = (token: string) => {
  localStorage.setItem(KEY, token)
}

const clear = () => {
  localStorage.removeItem(KEY)
}

export const accessTokenStorage = {
  get,
  set,
  clear,
}
