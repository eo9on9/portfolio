import { useItem } from '@entities/item/model/useItem'
import { Product } from '@features/product/model/product'
import { ProductTypeBadge } from '@features/product/ui/ProductTypeBadge'
import { toPrice } from '@shared/util/format'
import Image from 'next/image'

interface ProductSummaryCardProps {
  product: Product
}

export const ProductSummaryCard = ({ product }: ProductSummaryCardProps) => {
  const item = useItem(product.itemKey)

  if (!item) return null

  return (
    <div className="flex items-center gap-2 border border-gray-200 rounded-sm p-1 bg-white">
      <div className="relative size-10 rounded-sm overflow-hidden">
        <Image src={item.imageSrc} alt={item.name} width={40} height={40} />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-800">{item.name}</p>
          <ProductTypeBadge type={product.type} />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm text-blue-600">{toPrice(product.price)} G</p>
          <p className="text-sm text-gray-500">x {product.amount}</p>
        </div>
      </div>
    </div>
  )
}
