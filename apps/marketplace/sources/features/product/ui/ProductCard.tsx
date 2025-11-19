import { ITEM_CATEGORY_LABELS } from '@entities/item/model/itemCategory'
import { ITEM_DATABASE, KindOfItemKey } from '@entities/item/model/itemDatabase'
import { ItemGradeBadge } from '@entities/item/ui/ItemGradeBadge'
import { KindOfProductType } from '@features/product/model/productType'
import { ProductTypeBadge } from '@features/product/ui/ProductTypeBadge'
import { toAgo, toPrice } from '@shared/util/format'
import { tw } from '@shared/util/tw'
import Image from 'next/image'

interface ProductCardProps {
  productId: string
  itemKey: KindOfItemKey
  type: KindOfProductType
  price: number
  amount: number
  createdAt: number
  onClick?: (id: string) => void
}

export const ProductCard = ({
  productId,
  itemKey,
  type,
  price,
  amount,
  createdAt,
  onClick,
}: ProductCardProps) => {
  const item = ITEM_DATABASE[itemKey]

  return (
    <button className={containerTw} onClick={() => onClick?.(productId)}>
      <div className={imageTw}>
        <Image src={item.imageSrc} alt={item.name} fill />
        <div className={gradeTw}>
          <ItemGradeBadge grade={item.grade} />
        </div>
      </div>
      <div className={infoTw}>
        <div className={upperInfoTw}>
          <div className={infoLineTw}>
            <p className={nameTw}>{item.name}</p>
            <ProductTypeBadge type={type} />
          </div>
          <div className={infoLineTw}>
            <p className={categoryTw}>{ITEM_CATEGORY_LABELS[item.category]}</p>
          </div>
        </div>
        <div className={lowerInfoTw}>
          <div className={infoLineTw}>
            <div className={priceAmountTw}>
              <p className={priceTw}>{toPrice(price)} G</p>
              <p className={amountTw}>x {amount}</p>
            </div>
            <p className={agoTw}>{toAgo(createdAt)}</p>
          </div>
        </div>
      </div>
    </button>
  )
}

const containerTw = tw`
  flex gap-4 p-4 border border-gray-300 bg-white rounded-sm
  hover:shadow-lg transition-shadow duration-200 ease-out
`

const imageTw = tw`relative size-28 rounded-sm overflow-hidden`

const gradeTw = tw`absolute top-2 left-2 flex`

const infoTw = tw`flex-1 flex flex-col justify-between gap-2 py-1`

const upperInfoTw = tw`flex flex-col gap-1`

const lowerInfoTw = tw`flex flex-col gap-2`

const infoLineTw = tw`flex items-center justify-between`

const nameTw = tw`text-lg font-semibold text-gray-800`

const categoryTw = tw`text-base text-gray-500`

const priceAmountTw = tw`flex items-center gap-2`

const priceTw = tw`text-base text-blue-600`

const amountTw = tw`text-base text-gray-500`

const agoTw = tw`text-sm text-gray-500`
