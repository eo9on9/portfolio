import { ITEM_CATEGORY_LABELS } from '@entities/item/model/itemCategory'
import { KindOfItemKey } from '@entities/item/model/itemKey'
import { useItem } from '@entities/item/model/useItem'
import { ItemGradeBadge } from '@entities/item/ui/ItemGradeBadge'
import { KindOfProductType } from '@features/product/model/productType'
import { ProductTypeBadge } from '@features/product/ui/ProductTypeBadge'
import { Beacon } from '@shared/ui/Beacon'
import { cn } from '@shared/util/cn'
import { toAgo, toPrice } from '@shared/util/format'
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
  const item = useItem(itemKey)

  if (!item) return null

  return (
    <Beacon>
      <div
        className={containerTw}
        onClick={() => onClick?.(productId)}
        role="button"
        tabIndex={0}
      >
        <div className={imageTw}>
          <Image src={item.imageSrc} alt={item.name} width={96} height={96} />
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
              <p className={categoryTw}>
                {ITEM_CATEGORY_LABELS[item.category]}
              </p>
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
      </div>
    </Beacon>
  )
}

const containerTw = cn([
  /** base */
  'flex gap-4 w-full p-2 border border-gray-200 bg-white rounded-sm cursor-pointer',
  /** animation */
  'transition-shadow duration-200 ease-out',
  /** states */
  'hover:shadow-md',
])

const imageTw = cn`relative size-24 rounded-sm overflow-hidden`

const gradeTw = cn`absolute top-2 left-2 flex`

const infoTw = cn`flex-1 flex flex-col justify-between gap-2`

const upperInfoTw = cn`flex flex-col gap-1`

const lowerInfoTw = cn`flex flex-col gap-2`

const infoLineTw = cn`flex items-center justify-between`

const nameTw = cn`text-lg font-medium text-gray-800`

const categoryTw = cn`text-base text-gray-500`

const priceAmountTw = cn`flex items-center gap-2`

const priceTw = cn`text-base text-blue-600`

const amountTw = cn`text-base text-gray-500`

const agoTw = cn`text-sm text-gray-500`
