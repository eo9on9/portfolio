import { fromItemDTO, ItemDTO } from '@entities/item/api/dto/item'
import { Item } from '@entities/item/model/item'
import { KindOfItemKey } from '@entities/item/model/itemKey'
import { request } from '@shared/api/request'

type GetItemWikiResponseDTO = Record<KindOfItemKey, ItemDTO>

export type GetItemWikiResponse = Record<KindOfItemKey, Item>

const fromGetItemWikiResponseDTO = (
  dto: GetItemWikiResponseDTO,
): GetItemWikiResponse => {
  return Object.fromEntries(
    Object.entries(dto).map(([key, value]) => [key, fromItemDTO(value)]),
  ) as Record<KindOfItemKey, Item>
}

export const getItemWiki = async (): Promise<GetItemWikiResponse> => {
  const response = await request.get<GetItemWikiResponseDTO>('/item-wiki')

  return fromGetItemWikiResponseDTO(response)
}
