import { getProducts, GetProductsRes } from '@features/product/api/getProducts'
import {
  KindOfProductType,
  PRODUCT_TYPE_LABELS,
} from '@features/product/model/productType'
import { ProductCard } from '@features/product/ui/ProductCard'
import { Beacon } from '@shared/ui/Beacon'
import { IntersectionDetector } from '@shared/ui/IntersectionDetector'
import { ToggleGroup } from '@shared/ui/ToggleGroup'
import { ALL_VALUE, allToUndefined, withAll } from '@shared/util/form'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

const TOGGLE_GROUP_OPTIONS = withAll(
  Object.entries(PRODUCT_TYPE_LABELS).map(([key, value]) => ({
    label: value,
    value: key,
  })),
)

export const MainPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') ?? ALL_VALUE

  const queryClient = useQueryClient()
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['products'],
      getNextPageParam: (lastPage: GetProductsRes) =>
        lastPage.page < lastPage.totalPages
          ? { page: lastPage.page + 1 }
          : undefined,
      initialPageParam: { page: 1 },
      queryFn: ({ pageParam }) =>
        getProducts({
          ...pageParam,
          type: allToUndefined(tab) as KindOfProductType,
        }),
    })

  const handleIntersectionDetect = () => {
    if (!hasNextPage || isFetchingNextPage) return
    fetchNextPage()
  }

  return (
    <MainLayout>
      <PageTop
        title="최신 등록 매물"
        description="가장 최근에 등록된 아이템을 확인하세요."
      />
      <div className="w-full max-w-lg">
        <Beacon className="block">
          <ToggleGroup
            options={TOGGLE_GROUP_OPTIONS}
            value={tab}
            onChange={value => {
              const q = new URLSearchParams()
              q.set('tab', value)
              const qs = q.toString() ?? ''
              router.push(`?${qs}`)
              queryClient.removeQueries({ queryKey: ['products'] })
            }}
            fill
          />
        </Beacon>
      </div>
      <ul className="grid grid-cols-1 desktop:grid-cols-2 gap-4">
        {data?.pages
          .flatMap(page => page.products)
          .map(product => (
            <li key={product.id}>
              <Beacon>
                <ProductCard
                  productId={product.id}
                  itemKey={product.itemKey}
                  type={product.type}
                  price={product.price}
                  amount={product.amount}
                  createdAt={product.createdAt}
                  onClick={() =>
                    router.push(`/detail/${product.itemKey}?from=main`)
                  }
                />
              </Beacon>
            </li>
          ))}
      </ul>
      <IntersectionDetector onDetect={handleIntersectionDetect} />
    </MainLayout>
  )
}
