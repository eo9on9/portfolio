import { getConversation } from '@features/conversation/api/getConversation'
import { getMessages } from '@features/conversation/api/getMessages'
import { useSSE } from '@shared/hook/useSSE'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ConversationActions } from '@widgets/conversation/ui/ConversationActions'
import { ConversationHeader } from '@widgets/conversation/ui/ConversationHeader'
import { MessageList } from '@widgets/conversation/ui/MessageList'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const ConversationPage = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { event } = useSSE()
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
    if (event?.type === 'auto-reply') {
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] })
    }
  }, [event, conversationId, queryClient])

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
