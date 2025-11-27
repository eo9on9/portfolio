import { getConversation } from '@features/conversation/api/getConversation'
import { getMessages } from '@features/conversation/api/getMessages'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ConversationActions } from '@widgets/conversation/ui/ConversationActions'
import { ConversationHeader } from '@widgets/conversation/ui/ConversationHeader'
import { MessageList } from '@widgets/conversation/ui/MessageList'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { useRouter } from 'next/router'
import Pusher from 'pusher-js'
import { useEffect } from 'react'

export const ConversationPage = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { id: conversationId } = router.query as { id: string }

  const { data: conversationData } = useQuery({
    queryKey: ['conversation', conversationId],
    queryFn: () => getConversation({ conversationId: conversationId! }),
    enabled: !!conversationId,
  })

  const { data: messagesData } = useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => getMessages({ conversationId: conversationId! }),
    enabled: !!conversationId,
  })

  useEffect(() => {
    const pusher = new Pusher('f91108b021151316d7d9', {
      cluster: 'ap3',
    })

    const channel = pusher.subscribe('auto-reply')

    channel.bind('auto-reply', (data: { payload: string }) => {
      console.log('auto-reply', data)
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] })
    })

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
      pusher.disconnect()
    }
  }, [conversationId, queryClient])

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
    })
  }, [messagesData])

  return (
    <MainLayout>
      {conversationData && (
        <ConversationHeader conversation={conversationData.conversation} />
      )}

      {messagesData && <MessageList messages={messagesData.messages} />}

      {conversationData && (
        <ConversationActions conversation={conversationData.conversation} />
      )}
    </MainLayout>
  )
}
