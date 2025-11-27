import { KindOfItemKey } from '@entities/item/model/itemKey'
import { useItemWiki } from '@entities/item/model/useItemWiki'

export const useItem = (itemKey?: KindOfItemKey) => {
  const itemWiki = useItemWiki()

  return itemKey && itemWiki?.[itemKey]
}
