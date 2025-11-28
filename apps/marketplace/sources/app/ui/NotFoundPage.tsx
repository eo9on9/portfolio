import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const NotFoundPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/main')
  }, [router])

  return null
}
