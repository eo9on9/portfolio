import { updateOrderStatus } from '@entities/order/api/updateOrderStatus'
import { Order } from '@entities/order/model/order'
import {
  KindOfOrderStatus,
  ORDER_STATUS_LABELS,
} from '@entities/order/model/orderStatus'
import { useOrderFilterUrlParams } from '@features/order/model/useOrderFilterUrlParams'
import { Beacon, Button, FormField, useToast } from '@repo/ui-common'
import { Input } from '@shared/ui/Input'
import { Modal } from '@shared/ui/Modal'
import { Select } from '@shared/ui/Select'
import { toDate } from '@shared/util/format'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface ViewOrderModalProps {
  order: Order
  isOpen: boolean
  onClose: () => void
}

interface UpdateOrderStatusForm {
  status: KindOfOrderStatus
}

const STATUS_OPTIONS = Object.entries(ORDER_STATUS_LABELS).map(
  ([key, value]) => ({
    label: value,
    value: key,
  }),
)

export const ViewOrderModal = ({
  order,
  isOpen,
  onClose,
}: ViewOrderModalProps) => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const { urlParams } = useOrderFilterUrlParams()
  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<UpdateOrderStatusForm>({
    defaultValues: {
      status: '' as KindOfOrderStatus,
    },
  })
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders', JSON.stringify(urlParams)],
      })
    },
  })

  const handleUpdateOrderStatus = handleSubmit(async data => {
    try {
      await mutateAsync({ id: order.id, status: data.status })

      toast.success('주문 상태 업데이트 성공')

      onClose?.()
    } catch (error) {
      console.error(error)

      toast.error('주문 상태 업데이트에 실패했습니다.')
    }
  })

  useEffect(() => {
    if (isOpen) {
      reset({ status: order.status })
    }
  }, [isOpen, reset, order.status])

  return (
    <Modal title="주문 상세 정보" open={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4 py-4">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <FormField label="주문 번호">
              <Input value={order.id} readOnly />
            </FormField>
            <FormField label="주문일">
              <Input value={toDate(order.orderedAt)} readOnly />
            </FormField>
            <FormField label="고객명">
              <Input value={order.customer} readOnly />
            </FormField>
            <FormField label="상품명">
              <Input value={order.product} readOnly />
            </FormField>
            <FormField label="수량">
              <Input value={order.quantity} readOnly />
            </FormField>
            <FormField label="금액">
              <Input value={`₩${order.amount.toLocaleString()}`} readOnly />
            </FormField>
          </div>
          <FormField label="상태">
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select options={STATUS_OPTIONS} {...field} />
              )}
            />
          </FormField>
        </div>
        <Beacon className="flex flex-col">
          <Button
            variant="primary"
            size="lg"
            onClick={handleUpdateOrderStatus}
            isLoading={isPending}
            disabled={!isDirty}
          >
            상태 업데이트
          </Button>
        </Beacon>
      </div>
    </Modal>
  )
}
