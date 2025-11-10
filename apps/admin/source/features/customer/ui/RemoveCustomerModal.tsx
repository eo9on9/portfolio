import { removeCustomer } from '@entities/customer/api/removeCustomer'
import { Customer } from '@entities/customer/model/customer'
import { useCustomerFilterUrlParams } from '@features/customer/model/useCustomerFilterUrlParams'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface RemoveCustomerModalProps {
  customer: Customer
  isOpen: boolean
  onClose?: () => void
}

export const RemoveCustomerModal = ({
  customer,
  isOpen,
  onClose,
}: RemoveCustomerModalProps) => {
  const queryClient = useQueryClient()
  const { urlParams } = useCustomerFilterUrlParams()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: removeCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['customers', JSON.stringify(urlParams)],
      })
    },
  })

  const handleRemoveCustomer = async () => {
    await mutateAsync({ id: customer.id })

    onClose?.()
  }

  return (
    <Modal title="고객 삭제" open={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4 py-4">
        <div className="flex flex-col gap-2">
          <p className="text-gray-800">
            {customer?.name} 고객을 삭제하시겠습니까?
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={handleRemoveCustomer}
          isLoading={isPending}
        >
          삭제하기
        </Button>
      </div>
    </Modal>
  )
}
