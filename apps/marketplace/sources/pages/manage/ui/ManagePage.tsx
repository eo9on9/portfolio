import { getMyListing } from '@features/product/api/getMyListing'
import { Product } from '@features/product/model/product'
import { PRODUCT_TYPE_LABELS } from '@features/product/model/productType'
import { DeleteProductModal } from '@features/product/ui/DeleteProductModal'
import { ProductManageCard } from '@features/product/ui/ProductManageCard'
import { ToggleGroup } from '@shared/ui/ToggleGroup'
import { cn } from '@shared/util/cn'
import { ALL_VALUE, withAll } from '@shared/util/form'
import { useQuery } from '@tanstack/react-query'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const ManagePage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const type = searchParams.get('type') ?? ALL_VALUE

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const { data } = useQuery({
    queryKey: ['product', 'listing', 'my'],
    queryFn: getMyListing,
  })

  const myListing = (data?.products ?? []).filter(
    product => product.type === type || type === ALL_VALUE,
  )

  return (
    <MainLayout>
      <PageTop
        title="아이템 관리"
        description="내가 등록한 아이템을 관리하세요."
      />
      <div className={toggleGroupContainerCn}>
        <ToggleGroup
          options={withAll(
            Object.entries(PRODUCT_TYPE_LABELS).map(([key, value]) => ({
              label: value,
              value: key,
            })),
          )}
          value={type}
          onChange={value => {
            router.replace({
              pathname: router.pathname,
              query: {
                ...router.query,
                type: value,
              },
            })
          }}
          fill
        />
      </div>
      <ul className={listCn}>
        {myListing.map(product => (
          <li key={product.id}>
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

const toggleGroupContainerCn = cn`w-full max-w-lg`

const listCn = cn`grid grid-cols-1 desktop:grid-cols-2 gap-4`
