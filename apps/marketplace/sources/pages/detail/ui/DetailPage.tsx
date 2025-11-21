import { ProductDetailCard } from '@pages/detail/ui/ProductDetailCard'
import { ProductListingCard } from '@pages/detail/ui/ProductListingCard'
import { ProductPriceCard } from '@pages/detail/ui/ProductPriceCard'
import { cn } from '@shared/util/cn'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'

export const DetailPage = () => {
  return (
    <MainLayout>
      <PageTop
        title="아이템 상세"
        description="아이템 상세 정보를 확인하세요."
      />

      <div className={containerCn}>
        {/* 좌측 */}
        <div className={leftCn}>
          {/* 상세 카드 */}
          <ProductDetailCard />
        </div>

        {/* 우측 */}
        <div className={rightCn}>
          {/* 시세 카드 */}
          <ProductPriceCard />

          {/* 등록 리스트 */}
          <ProductListingCard />
        </div>
      </div>
    </MainLayout>
  )
}

const containerCn = cn`grid grid-cols-1 gap-y-4 items-start desktop:grid-cols-3 desktop:gap-x-4`

const leftCn = cn`col-span-1`

const rightCn = cn`col-span-2 flex flex-col gap-4`
