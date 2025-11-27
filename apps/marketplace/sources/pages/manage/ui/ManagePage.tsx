import { getMyListing } from '@features/product/api/getMyListing'
import { Product } from '@features/product/model/product'
import { PRODUCT_TYPE_LABELS } from '@features/product/model/productType'
import { DeleteProductModal } from '@features/product/ui/DeleteProductModal'
import { ProductManageCard } from '@features/product/ui/ProductManageCard'
import { useQueryParams } from '@shared/hook/useQueryParams'
import { useReplaceQueryParams } from '@shared/hook/useReplaceQueryParams'
import { Beacon } from '@shared/ui/Beacon'
import { ToggleGroup } from '@shared/ui/ToggleGroup'
import { ALL_VALUE, withAll } from '@shared/util/form'
import { useQuery } from '@tanstack/react-query'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'
import { useRouter } from 'next/router'
import { useState } from 'react'

const TOGGLE_GROUP_OPTIONS = withAll(
  Object.entries(PRODUCT_TYPE_LABELS).map(([key, value]) => ({
    label: value,
    value: key,
  })),
)

export const ManagePage = () => {
  const router = useRouter()
  const type = useQueryParams('type') ?? ALL_VALUE
  const replaceQueryParams = useReplaceQueryParams()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const { data } = useQuery({
    queryKey: ['product', 'listing', 'my'],
    queryFn: getMyListing,
  })

  const products = (data?.products ?? []).filter(
    product => product.type === type || type === ALL_VALUE,
  )

  return (
    <MainLayout>
      <PageTop
        title="아이템 관리"
        description="내가 등록한 아이템을 관리하세요."
      />
      <div className="w-full max-w-lg">
        <Beacon className="block">
          <ToggleGroup
            options={TOGGLE_GROUP_OPTIONS}
            value={type}
            onChange={value => replaceQueryParams({ type: value })}
            fill
          />
        </Beacon>
      </div>
      <ul className="grid grid-cols-1 desktop:grid-cols-2 gap-4">
        {products.map(product => (
          <li key={product.productId}>
            <ProductManageCard
              product={product}
              onClick={() => {
                router.push(
                  `/detail/${product.itemKey}?from=manage&type=${product.type}`,
                )
              }}
              onDelete={product => {
                setSelectedProduct(product)
                setModalOpen(true)
              }}
            />
          </li>
        ))}
      </ul>
      {selectedProduct && (
        <DeleteProductModal
          product={selectedProduct}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </MainLayout>
  )
}
