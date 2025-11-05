import { CreateCustomerParams } from '@entities/customer/api/createCustomer'
import { Button } from '@shared/ui/Button'
import { FormField } from '@shared/ui/FormField'
import { Input } from '@shared/ui/Input'
import { Modal } from '@shared/ui/Modal'
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
  const { register, handleSubmit } = useForm<CreateCustomerForm>({
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

  return (
    <Modal title="고객 추가" open={open} onClose={onClose}>
      <div className="flex flex-col gap-4 py-4">
        <div className="flex flex-col gap-2">
          <FormField label="이름">
            <Input placeholder="고객 이름을 입력하세요" {...register('name')} />
          </FormField>
          <FormField label="이메일">
            <Input placeholder="example@email.com" {...register('email')} />
          </FormField>
          <FormField label="전화번호">
            <Input placeholder="010-0000-0000" {...register('phone')} />
          </FormField>
        </div>
        <Button variant="primary" size="lg" onClick={handleAddCustomer}>
          추가하기
        </Button>
      </div>
    </Modal>
  )
}
