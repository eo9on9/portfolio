import { KindOfItemKey } from '@entities/item/model/itemKey'
import { useItem } from '@entities/item/model/useItem'
import { Conversation } from '@features/conversation/model/conversation'
import { getProduct } from '@features/product/api/getProduct'
import { Badge } from '@shared/ui/Badge'
import { cnMerge } from '@shared/util/cn'
import { toFullDate } from '@shared/util/format'
import { useQuery } from '@tanstack/react-query'
import { MessageSquare } from 'lucide-react'
import Image from 'next/image'

interface ConversationCardProps {
  conversation: Conversation
  onClick?: (conversation: Conversation) => void
}

export const ConversationCard = ({
  conversation,
  onClick,
}: ConversationCardProps) => {
  const { data } = useQuery({
    queryKey: ['product', conversation.productId],
    queryFn: () => getProduct({ id: conversation.productId }),
  })

  const item = useItem(data?.product.itemKey as KindOfItemKey)

  if (!data) return null

  if (!item) return null

  return (
    <div
      role="button"
      tabIndex={0}
      className={cnMerge([
        'flex flex-col gap-4 p-4 border border-gray-200 rounded-sm bg-white cursor-pointer hover:shadow-md transition-shadow duration-200 ease-out',
        conversation.hasNewMessage && 'border-blue-300 bg-blue-50',
      ])}
      onClick={() => onClick?.(conversation)}
    >
      <div className="flex flex-col flex-wrap justify-between gap-4 tablet:flex-row tablet:items-center">
        <div className="flex-1 flex items-center gap-2">
          <MessageSquare className="size-4 text-gray-800" />
          <p className="text-base font-medium text-gray-800">
            {conversation.partner}
          </p>
          {conversation.hasNewMessage && (
            <Badge className="bg-red-700 text-white">새 메시지</Badge>
          )}
        </div>
        <p className="text-sm text-gray-500">
          {toFullDate(conversation.lastMessageAt)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative size-10 rounded-sm overflow-hidden">
          <Image src={item.imageSrc} alt={item.name} width={40} height={40} />
        </div>
        <p className="text-sm text-gray-500">{item.name}</p>
      </div>
      <p className="text-sm text-gray-800">{conversation.lastMessage}</p>
    </div>
  )
}
