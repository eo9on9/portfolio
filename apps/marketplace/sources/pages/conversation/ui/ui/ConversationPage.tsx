import { KindOfItemKey } from '@entities/item/model/itemKey'
import { useItem } from '@entities/item/model/useItem'
import { getConversation } from '@features/conversation/api/getConversation'
import { getMessages } from '@features/conversation/api/getMessages'
import { sendMessage } from '@features/conversation/api/sendMessage'
import { MessageBubble } from '@features/conversation/ui/MessageBubble'
import { groupMessagesByDate } from '@features/conversation/util/groupMessagesByDate'
import { getProduct } from '@features/product/api/getProduct'
import { ProductTypeBadge } from '@features/product/ui/ProductTypeBadge'
import { Button } from '@shared/ui/Button'
import { Input } from '@shared/ui/Input'
import { toDate, toPrice } from '@shared/util/format'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const ConversationPage = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const [message, setMessage] = useState('')

  const { id } = router.query

  const conversationId = Array.isArray(id) ? id[0] : id

  const { data: conversationData } = useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: () => getConversation({ conversationId: conversationId! }),
    enabled: !!conversationId,
  })

  const { data: productData } = useQuery({
    queryKey: ['product', conversationData?.conversation.productId],
    queryFn: () => getProduct({ id: conversationData!.conversation.productId }),
    enabled: !!conversationData?.conversation.productId,
  })

  const item = useItem(productData?.product.itemKey as KindOfItemKey)

  const { data } = useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => getMessages({ conversationId: conversationId! }),
    enabled: !!conversationId,
  })

  const groupedMessages = groupMessagesByDate(data?.messages || [])

  const { mutate } = useMutation({
    mutationFn: () =>
      sendMessage({
        partner: conversationData!.conversation.partner,
        productId: conversationData!.conversation.productId,
        content: message,
      }),
    onSuccess: () => {
      setMessage('')
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] })
    },
  })

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
    })
  }, [data])

  const handleSendMessage = () => {
    mutate()
  }

  return (
    <MainLayout>
      <div className="fixed top-14 left-0 flex flex-wrap gap-2 items-center justify-between w-full px-6 py-2 backdrop-blur-md border-b border-gray-200">
        <p className="text-base font-medium text-gray-800">
          {conversationData?.conversation.partner}님과의 대화
        </p>
        {item && (
          <div className="flex items-center gap-2 border border-gray-200 rounded-sm p-1 bg-white">
            <div className="relative size-10 rounded-sm overflow-hidden">
              <Image
                src={item.imageSrc}
                alt={item.name}
                width={40}
                height={40}
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
      <div className="flex flex-col gap-4 pt-20">
        {Object.entries(groupedMessages).map(([date, messages]) => (
          <div key={date}>
            <div className="flex justify-center mt-8 mb-4">
              <p className="text-sm text-gray-500 bg-gray-200 rounded-sm p-2">
                {toDate(new Date(date).getTime())}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {messages.map(message => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-full px-6 py-4 backdrop-blur-md border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex flex-col">
            <Input
              placeholder="메시지를 입력하세요."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
          <Button onClick={handleSendMessage} disabled={!message}>
            전송
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}
