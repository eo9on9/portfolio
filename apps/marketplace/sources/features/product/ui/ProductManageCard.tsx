import { useItem } from '@entities/item/model/useItem'
import { ItemGradeBadge } from '@entities/item/ui/ItemGradeBadge'
import { Product } from '@features/product/model/product'
import { ProductTypeBadge } from '@features/product/ui/ProductTypeBadge'
import { Beacon, Button } from '@repo/ui-common'
import { toFullDate, toPrice } from '@shared/util/format'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'

interface ProductManageCardProps {
  product: Product
  onClick?: (product: Product) => void
  onDelete?: (product: Product) => void
}

export const ProductManageCard = ({
  product,
  onClick,
  onDelete,
}: ProductManageCardProps) => {
  const item = useItem(product.itemKey)

  if (!item) return null

  return (
    <Beacon>
      <div
        className="flex items-center flex-wrap gap-4 w-full p-2 border border-gray-200 bg-white rounded-sm cursor-pointer transition-shadow duration-200 ease-out hover:shadow-md"
        onClick={() => onClick?.(product)}
        role="button"
        tabIndex={0}
      >
        <div className="relative size-24 rounded-sm overflow-hidden">
          <Image src={item.imageSrc} alt={item.name} width={96} height={96} />
          <div className="absolute top-2 left-2 flex">
            <ItemGradeBadge grade={item.grade} />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <p className="text-lg font-medium text-gray-800">{item.name}</p>
            <ProductTypeBadge type={product.type} />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-base text-blue-600">
              {toPrice(product.price)} G
            </p>
            <p className="text-base text-gray-500">x {product.amount}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">
              {toFullDate(product.createdAt)}
            </p>
          </div>
        </div>
        <Beacon>
          <Button
            ref={ref => {
              if (ref) {
                ref.addEventListener('click', e => {
                  e.stopPropagation()
                  onDelete?.(product)
                })
              }
            }}
            variant="ghost"
            size="lg"
          >
            <Trash2 className="size-4 text-red-600" />
          </Button>
        </Beacon>
      </div>
    </Beacon>
  )
}
