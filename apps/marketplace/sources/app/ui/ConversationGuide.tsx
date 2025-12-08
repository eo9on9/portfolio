import { Modal } from '@repo/ui-common'
import Image from 'next/image'

interface ConversationGuideProps {
  open: boolean
  onClose: () => void
}

export const ConversationGuide = ({
  open,
  onClose,
}: ConversationGuideProps) => {
  return (
    <Modal title="안내" open={open} onClose={onClose}>
      <div className="flex flex-col items-center gap-4 py-4 text-sm text-center text-gray-800">
        <p className="text-2xl">🙌🏻</p>
        <p>원활한 데모를 위해</p>
        <p>쪽지를 보내면 자동으로 답장이 오도록 해두었어요</p>
        <div className="rounded-sm overflow-hidden">
          <Image
            src="/images/auto-reply-guide.gif"
            alt="auto-reply-guide"
            width={352}
            height={220}
          />
        </div>
        <p>마음껏 체험해보세요!</p>
      </div>
    </Modal>
  )
}
