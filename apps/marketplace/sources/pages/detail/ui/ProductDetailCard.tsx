import { getItemWiki } from '@entities/item/api/getItemWiki'
import { KindOfItemKey } from '@entities/item/model/itemKey'
import { ItemCategoryBadge } from '@entities/item/ui/ItemCategoryBadge'
import { ItemGradeBadge } from '@entities/item/ui/ItemGradeBadge'
import { getPriceHistory } from '@features/product/api/getPriceHistory'
import { CreateProductModal } from '@features/product/ui/CreateProductModal'
import { Button } from '@shared/ui/Button'
import { toPrice } from '@shared/util/format'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'

interface ProductDetailCardProps {
  itemKey: KindOfItemKey
}

export const ProductDetailCard = ({ itemKey }: ProductDetailCardProps) => {
  const [modalOpen, setModalOpen] = useState(false)

  const { data: itemWiki } = useQuery({
    queryKey: ['item-wiki'],
    queryFn: getItemWiki,
  })

  const { data: priceHistory } = useQuery({
    queryKey: ['price-history'],
    queryFn: getPriceHistory,
  })

  const info = itemWiki?.[itemKey]

  if (!info) return null

  return (
    <>
      <div className="flex flex-col gap-2 p-4 border border-gray-200 bg-white rounded-sm">
        <div className="overflow-hidden relative aspect-square rounded-sm">
          <Image src={info.imageSrc} alt={info.name} loading="eager" fill />
          <div className="absolute top-2 left-2 flex">
            <ItemGradeBadge grade={info.grade} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium text-gray-800">{info.name}</h3>
          <ItemCategoryBadge category={info.category} />
        </div>
        <p className="text-base text-gray-500">{info.description}</p>
        <div className="flex items-center justify-between bg-gray-100 p-4 my-2 rounded-sm">
          <p className="text-base text-gray-800">평균 시세</p>
          <p className="text-base text-blue-600">
            {toPrice(priceHistory?.averagePrice ?? 0)} G
          </p>
        </div>
        <Button onClick={() => setModalOpen(true)}>등록하기</Button>
      </div>
      <CreateProductModal
        itemKey={itemKey}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
