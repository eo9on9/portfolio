import { useItem } from '@entities/item/model/useItem'
import { deleteProduct } from '@features/product/api/deleteProduct'
import { Product } from '@features/product/model/product'
import { ProductTypeBadge } from '@features/product/ui/ProductTypeBadge'
import { Beacon, Button, useToast } from '@repo/ui-common'
import { Modal } from '@shared/ui/Modal'
import { toPrice } from '@shared/util/format'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'

interface DeleteProductModalProps {
  product: Product
  open: boolean
  onClose: () => void
}

export const DeleteProductModal = ({
  product,
  open,
  onClose,
}: DeleteProductModalProps) => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const item = useItem(product.itemKey)

  const { mutate, isPending } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success('상품이 삭제되었습니다.')
      queryClient.invalidateQueries({
        queryKey: ['product'],
      })
      onClose()
    },
    onError: () => {
      toast.error('상품 삭제에 실패했습니다.')
    },
  })

  if (!item) return null

  return (
    <Modal title="상품 삭제" open={open} onClose={onClose}>
      <div className="flex flex-col gap-2">
        <p className="mt-2 text-base text-gray-500">
          등록된 상품을 삭제하시겠습니까?
        </p>
        <div className="my-2">
          <div className="flex items-center gap-2 border border-gray-200 rounded-sm p-1 bg-white">
            <div className="relative size-10 rounded-sm overflow-hidden">
              <Image
                src={item.imageSrc}
                alt={item.name}
                width={40}
                height={40}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-800">{item?.name}</p>
                <ProductTypeBadge type={product.type} />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-blue-600">
                  {toPrice(product.price)} G
                </p>
                <p className="text-sm text-gray-500">x {product.amount}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <Button variant="ghost" size="lg" onClick={onClose}>
            취소
          </Button>
          <Beacon>
            <Button
              variant="primary"
              size="lg"
              isLoading={isPending}
              onClick={() => mutate({ productId: product.productId })}
            >
              삭제하기
            </Button>
          </Beacon>
        </div>
      </div>
    </Modal>
  )
}
