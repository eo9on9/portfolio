import { getConversations } from '@features/conversation/api/getConversations'
import { useQuery } from '@tanstack/react-query'
import { ConversationCard } from '@widgets/conversation/ui/ConversationCard'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'
import { useRouter } from 'next/router'

export const ConversationListPage = () => {
  const router = useRouter()

  const { data } = useQuery({
    queryKey: ['conversations'],
    queryFn: getConversations,
  })

  return (
    <MainLayout>
      <PageTop title="대화 목록" description="대화 목록을 확인하세요." />
      <ul className="flex flex-col gap-4">
        {data?.conversations.map(conversation => (
          <li key={conversation.conversationId}>
            <ConversationCard
              conversation={conversation}
              onClick={() =>
                router.push(`/conversation/${conversation.conversationId}`)
              }
            />
          </li>
        ))}
      </ul>
    </MainLayout>
  )
}
