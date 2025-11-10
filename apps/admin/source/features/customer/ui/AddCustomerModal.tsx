import {
  createCustomer,
  CreateCustomerParams,
} from '@entities/customer/api/createCustomer'
import {
  VALIDATION_EMAIL,
  VALIDATION_NAME,
  VALIDATION_PHONE,
  VALIDATION_REQUIRED,
} from '@shared/constant/validation'
import { Beacon } from '@shared/ui/Beacon'
import { Button } from '@shared/ui/Button'
import { FormField } from '@shared/ui/FormField'
import { Input } from '@shared/ui/Input'
import { Modal } from '@shared/ui/Modal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useCustomerFilterUrlParams } from '../model/useCustomerFilterUrlParams'

interface AddCustomerModalProps {
  open?: boolean
  onClose?: () => void
}

type CreateCustomerForm = CreateCustomerParams

export const AddCustomerModal = ({
  open = false,
  onClose,
}: AddCustomerModalProps) => {
  const queryClient = useQueryClient()
  const { urlParams } = useCustomerFilterUrlParams()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['customers', JSON.stringify(urlParams)],
      })
    },
  })

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCustomerForm>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  const handleAddCustomer = handleSubmit(async data => {
    try {
      await mutateAsync(data)

      onClose?.()
    } catch (error) {
      console.error(error)
    }
  })

  useEffect(() => {
    if (!open) reset()
  }, [open, reset])

  return (
    <Modal title="고객 추가" open={open} onClose={onClose}>
      <div className="flex flex-col gap-4 py-4">
        <div className="flex flex-col gap-2">
          <FormField label="이름" errorMessage={errors.name?.message}>
            <Input
              placeholder="고객 이름을 입력하세요"
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
              placeholder="example@email.com"
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
              placeholder="01012345678"
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
        </div>
        <Beacon>
          <Button
            variant="primary"
            size="lg"
            onClick={handleAddCustomer}
            className="w-full"
            isLoading={isPending}
          >
            추가하기
          </Button>
        </Beacon>
      </div>
    </Modal>
  )
}
