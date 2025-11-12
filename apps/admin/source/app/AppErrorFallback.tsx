import { accessTokenStorage } from '@shared/store/accessTokenStorage'
import { useEffect } from 'react'
import { FallbackProps } from 'react-error-boundary'

export const AppErrorFallback = ({ error }: FallbackProps) => {
  useEffect(() => {
    if (error.response?.status === 401) {
      accessTokenStorage.clear()
      window.location.href = '/login'
    }
  }, [error.response?.status])

  return null
}
