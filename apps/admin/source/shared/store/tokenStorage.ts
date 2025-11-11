const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token')
  }

  return null
}

const setToken = (token: string) => {
  localStorage.setItem('token', token)
}

const clearToken = () => {
  localStorage.removeItem('token')
}

export const tokenStorage = {
  getToken,
  setToken,
  clearToken,
}
