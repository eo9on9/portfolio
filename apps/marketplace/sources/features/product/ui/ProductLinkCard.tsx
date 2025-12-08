import { ITEM_CATEGORY_LABELS } from '@entities/item/model/itemCategory'
import { useItem } from '@entities/item/model/useItem'
import { ItemGradeBadge } from '@entities/item/ui/ItemGradeBadge'
import { Product } from '@features/product/model/product'
import { ProductTypeBadge } from '@features/product/ui/ProductTypeBadge'
import { Beacon } from '@repo/ui-common'
import { ITEM_BLUR_DATA_URL } from '@shared/constant/blur'
import { toAgo, toPrice } from '@shared/util/format'
import Image from 'next/image'
import Link from 'next/link'

interface ProductLinkCardProps {
  product: Product
  href: string
}

export const ProductLinkCard = ({ product, href }: ProductLinkCardProps) => {
  const item = useItem(product.itemKey)

  if (!item) return null

  return (
    <Beacon>
      <Link
        href={href}
        className="flex gap-4 w-full p-2 border border-gray-200 bg-white rounded-sm cursor-pointer transition-shadow duration-200 ease-out hover:shadow-md"
        role="button"
        tabIndex={0}
      >
        <div className="relative size-24 rounded-sm overflow-hidden">
          <Image
            src={item.imageSrc}
            alt={item.name}
            width={96}
            height={96}
            placeholder="blur"
            blurDataURL={ITEM_BLUR_DATA_URL}
          />
          <div className="absolute top-2 left-2 flex">
            <ItemGradeBadge grade={item.grade} />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-gray-800">{item.name}</p>
              <ProductTypeBadge type={product.type} />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-base text-gray-500">
                {ITEM_CATEGORY_LABELS[item.category]}
              </p>
            </div>
          </div>
          <div className={'flex flex-col gap-2'}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-base text-blue-600">
                  {toPrice(product.price)} G
                </p>
                <p className="text-base text-gray-500">x {product.amount}</p>
              </div>
              <p className="text-sm text-gray-500">
                {toAgo(product.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </Beacon>
  )
}
