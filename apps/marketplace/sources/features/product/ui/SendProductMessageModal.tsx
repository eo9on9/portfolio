import { useItem } from '@entities/item/model/useItem'
import { sendMessage } from '@features/conversation/api/sendMessage'
import { Product } from '@features/product/model/product'
import { ProductSummaryCard } from '@features/product/ui/ProductSummaryCard'
import { VALIDATION_REQUIRED } from '@shared/constant/validation'
import { Beacon } from '@shared/ui/Beacon'
import { Button } from '@shared/ui/Button'
import { FormField } from '@shared/ui/FormField'
import { Input } from '@shared/ui/Input'
import { Modal } from '@shared/ui/Modal'
import { useToast } from '@shared/ui/Toast'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface SendProductMessageModalProps {
  product: Product
  open: boolean
  onClose: () => void
}

export const SendProductMessageModal = ({
  product,
  open,
  onClose,
}: SendProductMessageModalProps) => {
  const toast = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      toast.success('메시지가 전송되었습니다.')
      onClose()
    },
    onError: () => {
      toast.error('메시지 전송에 실패했습니다.')
    },
  })

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: '',
    },
  })

  const item = useItem(product.itemKey)

  const handleSendMessage = handleSubmit(data => {
    mutate({
      partner: product.listedBy,
      productId: product.productId,
      content: data.message,
    })
  })

  useEffect(() => {
    if (open) reset()
  }, [open, reset])

  if (!item) return null

  return (
    <Modal title="쪽지 보내기" open={open} onClose={onClose}>
      <div className="flex flex-col gap-2">
        <p className="mt-2 text-base text-gray-500">
          {product.listedBy}님에게 문의를 보냅니다.
        </p>
        <div className="my-2">
          <ProductSummaryCard product={product} />
        </div>
        <FormField label="문의 내용" errorMessage={errors.message?.message}>
          <Input
            {...register('message', { required: VALIDATION_REQUIRED.message })}
            placeholder="문의 내용을 입력하세요."
            isError={!!errors.message}
          />
        </FormField>
        <div className="flex justify-end gap-2 mt-2">
          <Button variant="ghost" size="lg" onClick={onClose}>
            취소
          </Button>
          <Beacon>
            <Button
              variant="primary"
              size="lg"
              onClick={handleSendMessage}
              isLoading={isPending}
            >
              보내기
            </Button>
          </Beacon>
        </div>
      </div>
    </Modal>
  )
}
