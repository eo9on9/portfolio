import { GetCustomersRes } from '@entities/customer/api/getCustomers'
import { removeCustomer } from '@entities/customer/api/removeCustomer'
import { Customer } from '@entities/customer/model/customer'
import { useCustomerFilterUrlParams } from '@features/customer/model/useCustomerFilterUrlParams'
import { useToast } from '@repo/ui-common'
import { Beacon } from '@shared/ui/Beacon'
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
  const toast = useToast()
  const queryClient = useQueryClient()
  const { urlParams, setUrlParams } = useCustomerFilterUrlParams()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: removeCustomer,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['customers', JSON.stringify(urlParams)],
      })

      const data = queryClient.getQueryData<GetCustomersRes>([
        'customers',
        JSON.stringify(urlParams),
      ])

      if (!data?.customers.length) {
        setUrlParams({ ...urlParams, page: 1 })
      }
    },
  })

  const handleRemoveCustomer = async () => {
    try {
      await mutateAsync({ id: customer.id })

      toast.success('고객이 삭제되었습니다.')

      onClose?.()
    } catch (error) {
      console.error(error)

      toast.error('고객 삭제에 실패했습니다.')
    }
  }

  return (
    <Modal title="고객 삭제" open={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4 py-4">
        <div className="flex flex-col gap-2">
          <p className="text-gray-800">
            {customer?.name} 고객을 삭제하시겠습니까?
          </p>
        </div>
        <Beacon>
          <Button
            variant="primary"
            size="lg"
            onClick={handleRemoveCustomer}
            isLoading={isPending}
            className="w-full"
          >
            삭제하기
          </Button>
        </Beacon>
      </div>
    </Modal>
  )
}
