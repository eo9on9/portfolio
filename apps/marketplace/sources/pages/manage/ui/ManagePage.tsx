import { ProductManageCard } from '@features/product/ui/ProductManageCard'
import { ToggleGroup } from '@shared/ui/ToggleGroup'
import { cn } from '@shared/util/cn'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'

export const ManagePage = () => {
  return (
    <MainLayout>
      <PageTop
        title="아이템 관리"
        description="내가 등록한 아이템을 관리하세요."
      />
      <div className={toggleGroupContainerCn}>
        <ToggleGroup
          options={[
            { label: '판매', value: 'sell' },
            { label: '구매', value: 'buy' },
          ]}
          defaultValue="sell"
          fill
        />
      </div>
      <ul className={listCn}>
        <li>
          <ProductManageCard
            product={{
              id: '1',
              itemKey: 'woodenSword',
              type: 'sell',
              listedBy: 'seller1',
              price: 40000000,
              amount: 1,
              createdAt: 1763530721716,
            }}
            onClick={() => {}}
          />
        </li>
        <li>
          <ProductManageCard
            product={{
              id: '2',
              itemKey: 'woodenSword',
              type: 'sell',
              listedBy: 'seller1',
              price: 40000000,
              amount: 1,
              createdAt: 1763530721716,
            }}
            onClick={() => {}}
          />
        </li>
        <li>
          <ProductManageCard
            product={{
              id: '3',
              itemKey: 'woodenSword',
              type: 'sell',
              listedBy: 'seller1',
              price: 40000000,
              amount: 1,
              createdAt: 1763530721716,
            }}
            onClick={() => {}}
          />
        </li>
        <li>
          <ProductManageCard
            product={{
              id: '4',
              itemKey: 'woodenSword',
              type: 'buy',
              listedBy: 'seller1',
              price: 40000000,
              amount: 1,
              createdAt: 1763530721716,
            }}
            onClick={() => {}}
          />
        </li>
        <li>
          <ProductManageCard
            product={{
              id: '5',
              itemKey: 'woodenSword',
              type: 'buy',
              listedBy: 'seller1',
              price: 40000000,
              amount: 1,
              createdAt: 1763530721716,
            }}
            onClick={() => {}}
          />
        </li>
        <li>
          <ProductManageCard
            product={{
              id: '6',
              itemKey: 'woodenSword',
              type: 'buy',
              listedBy: 'seller1',
              price: 40000000,
              amount: 1,
              createdAt: 1763530721716,
            }}
            onClick={() => {}}
          />
        </li>
      </ul>
    </MainLayout>
  )
}

const toggleGroupContainerCn = cn`w-full max-w-lg`

const listCn = cn`grid grid-cols-1 desktop:grid-cols-2 gap-4`
