import { User } from '@entities/user/model/user'
import { USER_ROLE_LABELS } from '@entities/user/model/userRole'
import { accessTokenStorage } from '@shared/store/accessTokenStorage'
import { Button } from '@shared/ui/Button'
import { FormField } from '@shared/ui/FormField'
import { Input } from '@shared/ui/Input'
import { Modal } from '@shared/ui/Modal'

interface ProfileModalProps {
  user: User
  isOpen: boolean
  onClose: () => void
}

export const ProfileModal = ({ user, isOpen, onClose }: ProfileModalProps) => {
  const handleLogout = () => {
    accessTokenStorage.clear()
    window.location.href = '/login'
  }

  return (
    <Modal title="사용자 정보" open={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4 py-4">
        <div className="grid grid-cols-2 gap-2">
          <FormField label="이름">
            <Input value={user.name} readOnly />
          </FormField>
          <FormField label="이메일">
            <Input value={user.email} readOnly />
          </FormField>
          <FormField label="전화번호">
            <Input value={user.phone} readOnly />
          </FormField>
          <FormField label="권한">
            <Input value={USER_ROLE_LABELS[user.role]} readOnly />
          </FormField>
        </div>

        <Button variant="primary" size="lg" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </Modal>
  )
}
