import { accessTokenStorage } from '@shared/store/accessTokenStorage'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const NotFoundPage = () => {
  const router = useRouter()

  useEffect(() => {
    if (accessTokenStorage.get()) {
      router.replace('/dashboard')
    } else {
      router.replace('/login')
    }
  }, [router])

  return null
}
