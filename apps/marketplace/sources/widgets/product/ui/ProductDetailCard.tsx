import { KindOfItemKey } from '@entities/item/model/itemKey'
import { useItem } from '@entities/item/model/useItem'
import { ItemCategoryBadge } from '@entities/item/ui/ItemCategoryBadge'
import { ItemGradeBadge } from '@entities/item/ui/ItemGradeBadge'
import { getPriceHistory } from '@features/product/api/getPriceHistory'
import { CreateProductModal } from '@features/product/ui/CreateProductModal'
import { Beacon, Button } from '@repo/ui-common'
import { toPrice } from '@shared/util/format'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'

interface ProductDetailCardProps {
  itemKey: KindOfItemKey
}

export const ProductDetailCard = ({ itemKey }: ProductDetailCardProps) => {
  const [modalOpen, setModalOpen] = useState(false)

  const item = useItem(itemKey)

  const { data } = useQuery({
    queryKey: ['price-history', itemKey],
    queryFn: () => getPriceHistory({ itemKey }),
    enabled: !!itemKey,
  })

  if (!item) return null

  return (
    <>
      <div className="flex flex-col gap-2 p-4 border border-gray-200 bg-white rounded-sm">
        <div className="overflow-hidden relative aspect-square rounded-sm">
          <Image src={item.imageSrc} alt={item.name} loading="eager" fill />
          <div className="absolute top-2 left-2 flex">
            <ItemGradeBadge grade={item.grade} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
          <ItemCategoryBadge category={item.category} />
        </div>
        <p className="text-base text-gray-500">{item.description}</p>
        <div className="flex items-center justify-between bg-gray-100 p-4 my-2 rounded-sm">
          <p className="text-base text-gray-800">평균 시세</p>
          <p className="text-base text-blue-600">
            {toPrice(data?.average ?? 0)} G
          </p>
        </div>
        <Beacon>
          <Button onClick={() => setModalOpen(true)} className="w-full">
            등록하기
          </Button>
        </Beacon>
      </div>
      <CreateProductModal
        itemKey={itemKey}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
