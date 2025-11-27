import { KindOfItemKey } from '@entities/item/model/itemKey'
import { useItem } from '@entities/item/model/useItem'
import { createProduct } from '@features/product/api/createProduct'
import {
  KindOfProductType,
  PRODUCT_TYPE,
  PRODUCT_TYPE_LABELS,
} from '@features/product/model/productType'
import {
  VALIDATION_POSITIVE_NUMBER,
  VALIDATION_REQUIRED,
} from '@shared/constant/validation'
import { Beacon } from '@shared/ui/Beacon'
import { Button } from '@shared/ui/Button'
import { FormField } from '@shared/ui/FormField'
import { Input } from '@shared/ui/Input'
import { Modal } from '@shared/ui/Modal'
import { Select } from '@shared/ui/Select'
import { useToast } from '@shared/ui/Toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface CreateProductModalProps {
  itemKey: KindOfItemKey
  open: boolean
  onClose: () => void
}

type CreateProductForm = {
  type: KindOfProductType
  price: string
  amount: string
}

export const CreateProductModal = ({
  itemKey,
  open,
  onClose,
}: CreateProductModalProps) => {
  const toast = useToast()
  const queryClient = useQueryClient()

  const item = useItem(itemKey)

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success('상품이 등록되었습니다.')
      queryClient.invalidateQueries({
        queryKey: ['product'],
      })
      onClose?.()
    },
    onError: () => {
      toast.error('상품 등록에 실패했습니다.')
    },
  })

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductForm>({
    defaultValues: {
      type: PRODUCT_TYPE[0],
      price: '',
      amount: '1',
    },
  })

  const handleCreateProduct = handleSubmit(data => {
    mutate({
      itemKey,
      type: data.type,
      price: Number(data.price),
      amount: Number(data.amount),
    })
  })

  useEffect(() => {
    if (open) reset()
  }, [open, reset])

  if (!item) return null

  return (
    <Modal title="등록하기" open={open} onClose={onClose}>
      <div className="flex flex-col gap-2">
        <p className="mt-2 text-base text-gray-500">
          {item.name}을 등록합니다.
        </p>
        <FormField label="거래 유형">
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select
                options={Object.entries(PRODUCT_TYPE_LABELS).map(
                  ([key, value]) => ({ label: value, value: key }),
                )}
                {...field}
              />
            )}
          />
        </FormField>
        <FormField label="가격 (G)" errorMessage={errors.price?.message}>
          <Input
            placeholder="상품의 가격을 입력하세요."
            {...register('price', {
              required: VALIDATION_REQUIRED.message,
              pattern: {
                value: VALIDATION_POSITIVE_NUMBER.pattern,
                message: VALIDATION_POSITIVE_NUMBER.message,
              },
            })}
            isError={!!errors.price}
          />
        </FormField>
        <FormField label="수량" errorMessage={errors.amount?.message}>
          <Input
            placeholder="상품의 수량을 입력하세요."
            {...register('amount', {
              required: VALIDATION_REQUIRED.message,
              pattern: {
                value: VALIDATION_POSITIVE_NUMBER.pattern,
                message: VALIDATION_POSITIVE_NUMBER.message,
              },
            })}
            isError={!!errors.amount}
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
              onClick={handleCreateProduct}
              isLoading={isPending}
            >
              등록하기
            </Button>
          </Beacon>
        </div>
      </div>
    </Modal>
  )
}
