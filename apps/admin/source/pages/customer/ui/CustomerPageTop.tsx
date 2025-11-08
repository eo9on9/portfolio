import { AddCustomerModal } from '@features/customer/ui/AddCustomerModal'
import { Beacon } from '@shared/ui/Beacon'
import { Button } from '@shared/ui/Button'
import { PageTop } from '@widgets/layout/ui/PageTop'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export const CustomerPageTop = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <PageTop
        title="고객 관리"
        description="전체 고객 정보를 관리합니다."
        actions={
          <Beacon>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-4 h-4" />
              고객 추가
            </Button>
          </Beacon>
        }
      />
      <AddCustomerModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
