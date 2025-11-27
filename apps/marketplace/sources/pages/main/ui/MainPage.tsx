import {
  searchProducts,
  SearchProductsRes,
} from '@features/product/api/searchProducts'
import {
  KindOfProductType,
  PRODUCT_TYPE_LABELS,
} from '@features/product/model/productType'
import { ProductLinkCard } from '@features/product/ui/ProductLinkCard'
import { useQueryParams } from '@shared/hook/useQueryParams'
import { useReplaceQueryParams } from '@shared/hook/useReplaceQueryParams'
import { Beacon } from '@shared/ui/Beacon'
import { IntersectionDetector } from '@shared/ui/IntersectionDetector'
import { ToggleGroup } from '@shared/ui/ToggleGroup'
import { ALL_VALUE, allToUndefined, withAll } from '@shared/util/form'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'

const TOGGLE_GROUP_OPTIONS = withAll(
  Object.entries(PRODUCT_TYPE_LABELS).map(([key, value]) => ({
    label: value,
    value: key,
  })),
)

export const MainPage = () => {
  const queryClient = useQueryClient()
  const replaceQueryParams = useReplaceQueryParams()

  const type = useQueryParams('type') ?? ALL_VALUE

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['product', 'search'],
      getNextPageParam: (lastPage: SearchProductsRes) =>
        lastPage.page < lastPage.totalPages
          ? {
              page: lastPage.page + 1,
              type: allToUndefined(type) as KindOfProductType,
            }
          : undefined,
      initialPageParam: {
        page: 1,
        type: allToUndefined(type) as KindOfProductType,
      },
      queryFn: ({ pageParam }) =>
        searchProducts({
          ...pageParam,
        }),
    })

  const handleTypeChange = (value: string) => {
    replaceQueryParams({ type: value })
    queryClient.removeQueries({ queryKey: ['product', 'search'] })
  }

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
            value={type}
            onChange={handleTypeChange}
            fill
          />
        </Beacon>
      </div>
      <ul className="grid grid-cols-1 desktop:grid-cols-2 gap-4">
        {data?.pages
          .flatMap(page => page.products)
          .map(product => (
            <li key={product.productId}>
              <ProductLinkCard
                product={product}
                href={`/detail/${product.itemKey}?from=main`}
              />
            </li>
          ))}
      </ul>
      <IntersectionDetector onDetect={handleIntersectionDetect} />
    </MainLayout>
  )
}
