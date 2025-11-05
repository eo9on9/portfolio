import { CreateCustomerParams } from '@entities/customer/api/createCustomer'
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
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface AddCustomerModalProps {
  open?: boolean
  onClose?: () => void
}

type CreateCustomerForm = CreateCustomerParams

export const AddCustomerModal = ({
  open = false,
  onClose,
}: AddCustomerModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCustomerForm>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  const handleAddCustomer = handleSubmit(data => {
    try {
      // TODO: add customer
      console.log(data)

      onClose?.()
    } catch (error) {
      // TODO: handle error
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
              placeholder="010-0000-0000"
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
        <Button variant="primary" size="lg" onClick={handleAddCustomer}>
          추가하기
        </Button>
      </div>
    </Modal>
  )
}
