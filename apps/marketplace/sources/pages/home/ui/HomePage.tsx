import { ToggleGroup } from '@shared/ui/ToggleGroup'
import { cn } from '@shared/util/cn'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'
import { ProductList } from '@widgets/product/ui/ProductList'

export const HomePage = () => {
  return (
    <MainLayout>
      <PageTop
        title="최신 등록 매물"
        description="가장 최근에 등록된 아이템을 확인하세요."
      />
      <div className={toggleGroupContainerCn}>
        <ToggleGroup
          options={[
            { label: '전체', value: 'all' },
            { label: '판매', value: 'sell' },
            { label: '구매', value: 'buy' },
          ]}
          defaultValue="all"
          fill
        />
      </div>
      <ProductList />
    </MainLayout>
  )
}

const toggleGroupContainerCn = cn`w-full max-w-lg`
