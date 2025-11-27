import { KindOfItemKey } from '@entities/item/model/itemKey'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'
import { ProductDetailCard } from '@widgets/product/ui/ProductDetailCard'
import { ProductListingCard } from '@widgets/product/ui/ProductListingCard'
import { ProductPriceCard } from '@widgets/product/ui/ProductPriceCard'
import { useRouter } from 'next/router'

export const DetailPage = () => {
  const router = useRouter()
  const { itemKey } = router.query as { itemKey: KindOfItemKey }

  return (
    <MainLayout>
      <PageTop
        title="아이템 상세"
        description="아이템 상세 정보를 확인하세요."
      />
      <div className="grid grid-cols-1 gap-y-4 items-start desktop:grid-cols-3 desktop:gap-x-4">
        <div className="col-span-1">
          <ProductDetailCard itemKey={itemKey} />
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          <ProductPriceCard itemKey={itemKey} />
          <ProductListingCard itemKey={itemKey} />
        </div>
      </div>
    </MainLayout>
  )
}
