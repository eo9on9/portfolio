import { cn } from '@shared/util/cn'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'
import { MessageCard } from '@widgets/message/ui/MessageCard'

export const MessagePage = () => {
  return (
    <MainLayout>
      <PageTop title="쪽지함" description="받은 쪽지를 확인하세요." />
      <ul className={listCn}>
        <li>
          <MessageCard />
        </li>
        <li>
          <MessageCard isNew />
        </li>
        <li>
          <MessageCard />
        </li>
      </ul>
    </MainLayout>
  )
}

const listCn = cn`flex flex-col gap-4`
