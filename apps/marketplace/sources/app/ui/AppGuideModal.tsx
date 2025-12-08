import { Beacon, Button } from '@repo/ui-common'
import { Modal } from '@shared/ui/Modal'

interface AppGuideModalProps {
  open: boolean
  onClose: () => void
}

export const AppGuideModal = ({ open, onClose }: AppGuideModalProps) => {
  return (
    <Modal title="안내" open={open} onClose={onClose}>
      <div className="flex flex-col items-center gap-4 py-4 text-sm text-center text-gray-800">
        <p className="text-2xl">🙌🏻</p>
        <p>환영합니다</p>
        <p>상호작용이 가능한 버튼들에는 빨간 불빛이 반짝이고 있어요</p>
        <Beacon>
          <Button variant="primary" size="md">
            이것처럼요
          </Button>
        </Beacon>
        <p>마음껏 체험해보세요!</p>
      </div>
    </Modal>
  )
}
