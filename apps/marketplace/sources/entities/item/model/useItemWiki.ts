import { getItemWiki } from '@entities/item/api/getItemWiki'
import { useQuery } from '@tanstack/react-query'

export const useItemWiki = () => {
  const { data: itemWiki } = useQuery({
    queryKey: ['item-wiki'],
    queryFn: getItemWiki,
    throwOnError: true,
    staleTime: Infinity,
    retry: false,
  })

  return itemWiki
}
