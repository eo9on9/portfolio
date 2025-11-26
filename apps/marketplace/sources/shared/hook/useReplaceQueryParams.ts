import { useRouter } from 'next/router'
import { useCallback } from 'react'

export const useReplaceQueryParams = () => {
  const router = useRouter()

  return useCallback(
    (query: Record<string, string>) => {
      router.replace({
        pathname: router.pathname,
        query: {
          ...router.query,
          ...query,
        },
      })
    },
    [router],
  )
}
