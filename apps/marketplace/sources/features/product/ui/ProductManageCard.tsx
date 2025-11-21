import { ITEM_DATABASE } from '@entities/item/model/itemDatabase'
import { ItemGradeBadge } from '@entities/item/ui/ItemGradeBadge'
import { Product } from '@features/product/model/product'
import { ProductTypeBadge } from '@features/product/ui/ProductTypeBadge'
import { Button } from '@shared/ui/Button'
import { cn } from '@shared/util/cn'
import { toFullDate, toPrice } from '@shared/util/format'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'

interface ProductManageCardProps {
  product: Product
  onClick?: (id: string) => void
}

export const ProductManageCard = ({
  product,
  onClick,
}: ProductManageCardProps) => {
  const item = ITEM_DATABASE[product.itemKey]

  return (
    <div
      className={containerTw}
      onClick={() => onClick?.(product.id)}
      role="button"
      tabIndex={0}
    >
      <div className={imageTw}>
        <Image src={item.imageSrc} alt={item.name} fill />
        <div className={gradeTw}>
          <ItemGradeBadge grade={item.grade} />
        </div>
      </div>
      <div className={infoTw}>
        <div className={infoLineTw}>
          <p className={nameTw}>{item.name}</p>
          <ProductTypeBadge type={product.type} />
        </div>
        <div className={infoLineTw}>
          <div className={priceAmountTw}>
            <p className={priceTw}>{toPrice(product.price)} G</p>
            <p className={amountTw}>x {product.amount}</p>
          </div>
        </div>
        <div className={infoLineTw}>
          <p className={dataTw}>{toFullDate(product.createdAt)}</p>
        </div>
      </div>
      <div className={actionTw}>
        <Button variant="ghost">
          <Trash2 className="size-4 text-red-600" />
        </Button>
      </div>
    </div>
  )
}

const containerTw = cn([
  /** base */
  'flex items-center flex-wrap gap-4 w-full p-2 border border-gray-200 bg-white rounded-sm cursor-pointer',
  /** animation */
  'transition-shadow duration-200 ease-out',
  /** states */
  'hover:shadow-md',
])

const imageTw = cn`relative size-24 rounded-sm overflow-hidden`

const gradeTw = cn`absolute top-2 left-2 flex`

const infoTw = cn`flex-1 flex flex-col gap-2`

const infoLineTw = cn`flex items-center gap-2`

const nameTw = cn`text-lg font-medium text-gray-800`

const priceAmountTw = cn`flex items-center gap-2`

const priceTw = cn`text-base text-blue-600`

const amountTw = cn`text-base text-gray-500`

const dataTw = cn`text-sm text-gray-500`

const actionTw = cn``
