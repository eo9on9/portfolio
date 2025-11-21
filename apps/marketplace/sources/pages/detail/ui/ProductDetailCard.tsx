import { ItemCategoryBadge } from '@entities/item/ui/ItemCategoryBadge'
import { ItemGradeBadge } from '@entities/item/ui/ItemGradeBadge'
import { Button } from '@shared/ui/Button'
import { cn } from '@shared/util/cn'
import Image from 'next/image'

export const ProductDetailCard = () => {
  return (
    <div className={containerTw}>
      <div className={imageTw}>
        <Image src="/images/wooden-sword.png" alt="나무 검" fill />
        <div className={gradeTw}>
          <ItemGradeBadge grade="normal" />
        </div>
      </div>
      <div className={titleWrapTw}>
        <h3 className={titleTw}>나무 검</h3>
        <ItemCategoryBadge category="weapon" />
      </div>
      <p className={descriptionTw}>나무로 만들어진 검. (공격력 +10)</p>
      <div className={priceTw}>
        <p className={priceLabelTw}>평균 시세</p>
        <p className={priceValueTw}>4,833,333 G</p>
      </div>
      <Button>등록하기</Button>
    </div>
  )
}

const containerTw = cn`flex flex-col gap-2 p-4 border border-gray-200 bg-white rounded-sm`

const imageTw = cn`overflow-hidden relative aspect-square rounded-sm`

const titleWrapTw = cn`flex items-center gap-2`

const titleTw = cn`text-lg font-medium text-gray-800`

const gradeTw = cn`absolute top-2 left-2 flex`

const descriptionTw = cn`text-base text-gray-500`

const priceTw = cn`flex items-center justify-between border-t border-gray-200 pt-4 my-4`

const priceLabelTw = cn`text-base text-gray-500`

const priceValueTw = cn`text-base text-blue-600`
