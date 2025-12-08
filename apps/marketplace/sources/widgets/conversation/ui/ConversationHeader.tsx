import { useItem } from '@entities/item/model/useItem'
import { Conversation } from '@features/conversation/model/conversation'
import { getProduct } from '@features/product/api/getProduct'
import { ProductTypeBadge } from '@features/product/ui/ProductTypeBadge'
import { ITEM_BLUR_DATA_URL } from '@shared/constant/blur'
import { toPrice } from '@shared/util/format'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

interface ConversationHeaderProps {
  conversation: Conversation
}

export const ConversationHeader = ({
  conversation,
}: ConversationHeaderProps) => {
  const { data: productData } = useQuery({
    queryKey: ['product', conversation.productId],
    queryFn: () => getProduct({ productId: conversation.productId }),
  })

  const item = useItem(productData?.product.itemKey)

  return (
    <div className="fixed top-14 left-0 right-0 backdrop-blur-md border-b border-gray-200">
      <div className="flex flex-wrap items-center justify-between gap-2 w-full max-w-[1280px] mx-auto px-6 py-2">
        <p className="text-base font-medium text-gray-800">
          {conversation.partner}님과의 대화
        </p>
        {item && (
          <div className="flex items-center gap-2 border border-gray-200 rounded-sm p-1 bg-white">
            <div className="relative size-10 rounded-sm overflow-hidden">
              <Image
                src={item.imageSrc}
                alt={item.name}
                width={40}
                height={40}
                placeholder="blur"
                blurDataURL={ITEM_BLUR_DATA_URL}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-800">{item?.name}</p>
                <ProductTypeBadge type={productData!.product.type} />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-blue-600">
                  {toPrice(productData?.product.price || 0)} G
                </p>
                <p className="text-sm text-gray-500">
                  x {productData?.product.amount}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
