import {
  updateCustomer,
  UpdateCustomerParams,
} from '@entities/customer/api/updateCustomer'
import { Customer } from '@entities/customer/model/customer'
import {
  CUSTOMER_STATUS,
  CUSTOMER_STATUS_LABELS,
} from '@entities/customer/model/customerStatus'
import { Beacon, useToast } from '@repo/ui-common'
import {
  VALIDATION_EMAIL,
  VALIDATION_NAME,
  VALIDATION_PHONE,
  VALIDATION_REQUIRED,
} from '@shared/constant/validation'
import { Button } from '@shared/ui/Button'
import { FormField } from '@shared/ui/FormField'
import { Input } from '@shared/ui/Input'
import { Modal } from '@shared/ui/Modal'
import { Select, SelectOption } from '@shared/ui/Select'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useCustomerFilterUrlParams } from '../model/useCustomerFilterUrlParams'

interface UpdateCustomerModalProps {
  customer: Customer
  isOpen: boolean
  onClose?: () => void
}

const STATUS_OPTIONS = CUSTOMER_STATUS.map(
  status =>
    ({
      label: CUSTOMER_STATUS_LABELS[status],
      value: status,
    }) as SelectOption,
)

type UpdateCustomerForm = Omit<UpdateCustomerParams, 'id'>

export const UpdateCustomerModal = ({
  customer,
  isOpen,
  onClose,
}: UpdateCustomerModalProps) => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const { urlParams } = useCustomerFilterUrlParams()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['customers', JSON.stringify(urlParams)],
      })
    },
  })

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateCustomerForm>()

  const handleUpdateCustomer = handleSubmit(async data => {
    try {
      await mutateAsync({ id: customer.id, ...data })

      toast.success('고객 정보가 수정되었습니다.')

      onClose?.()
    } catch (error) {
      console.error(error)

      toast.error('고객 정보 수정에 실패했습니다.')
    }
  })

  useEffect(() => {
    if (isOpen)
      reset({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        status: customer.status,
      })
  }, [isOpen, reset, customer])

  return (
    <Modal title="고객 정보 수정" open={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4 py-4">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-1 gap-2">
            <FormField label="이름" errorMessage={errors.name?.message}>
              <Input
                isError={!!errors.name}
                {...register('name', {
                  required: VALIDATION_REQUIRED.message,
                  pattern: {
                    value: VALIDATION_NAME.pattern,
                    message: VALIDATION_NAME.message,
                  },
                })}
              />
            </FormField>
            <FormField label="이메일" errorMessage={errors.email?.message}>
              <Input
                isError={!!errors.email}
                {...register('email', {
                  required: VALIDATION_REQUIRED.message,
                  pattern: {
                    value: VALIDATION_EMAIL.pattern,
                    message: VALIDATION_EMAIL.message,
                  },
                })}
              />
            </FormField>
            <FormField label="휴대폰 번호" errorMessage={errors.phone?.message}>
              <Input
                isError={!!errors.phone}
                {...register('phone', {
                  required: VALIDATION_REQUIRED.message,
                  pattern: {
                    value: VALIDATION_PHONE.pattern,
                    message: VALIDATION_PHONE.message,
                  },
                })}
              />
            </FormField>
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
        </div>
        <Beacon>
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleUpdateCustomer}
            isLoading={isPending}
            disabled={!isDirty}
          >
            수정하기
          </Button>
        </Beacon>
      </div>
    </Modal>
  )
}
