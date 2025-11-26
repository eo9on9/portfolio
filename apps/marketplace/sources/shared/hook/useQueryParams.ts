import { useSearchParams } from 'next/navigation'

export const useQueryParams = (key: string) => {
  const searchParams = useSearchParams()

  return searchParams.get(key)
}
