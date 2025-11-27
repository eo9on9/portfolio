import {
  searchProducts,
  SearchProductsRes,
} from '@features/product/api/searchProducts'
import { ProductLinkCard } from '@features/product/ui/ProductLinkCard'
import { IntersectionDetector } from '@shared/ui/IntersectionDetector'
import { allToUndefined, emptyToUndefined } from '@shared/util/form'
import { useInfiniteQuery } from '@tanstack/react-query'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'
import { useProductSearchForm } from '@widgets/product/model/useProductSearchForm'
import { useProductSearchUrlParams } from '@widgets/product/model/useProductSearchUrlParams'
import { ProductSearchActions } from '@widgets/product/ui/ProductSearchActions'
import { ProductSearchForms } from '@widgets/product/ui/ProductSearchForms'
import { useEffect, useMemo } from 'react'
import { FormProvider } from 'react-hook-form'

export const SearchPage = () => {
  const { urlParams, setUrlParams } = useProductSearchUrlParams()

  const params = useMemo(
    () => ({
      name: emptyToUndefined(urlParams.name),
      category: allToUndefined(urlParams.category),
      grade: allToUndefined(urlParams.grade),
      type: allToUndefined(urlParams.type),
    }),
    [urlParams],
  )

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['product', 'search', JSON.stringify(urlParams)],
      getNextPageParam: (lastPage: SearchProductsRes) =>
        lastPage.page < lastPage.totalPages
          ? { page: lastPage.page + 1, ...params }
          : undefined,
      initialPageParam: { page: 1, ...params },
      queryFn: ({ pageParam }) =>
        searchProducts({
          ...pageParam,
        }),
      retry: false,
    })

  const form = useProductSearchForm()
  const { reset, handleSubmit } = form

  const handleSearch = handleSubmit(data => {
    setUrlParams(data)
  })
  const handleIntersectionDetect = () => {
    if (!hasNextPage || isFetchingNextPage) return
    fetchNextPage()
  }

  useEffect(() => {
    reset(urlParams)
  }, [urlParams, reset])

  return (
    <MainLayout>
      <PageTop title="아이템 검색" description="원하는 아이템을 검색하세요." />
      <FormProvider {...form}>
        <ProductSearchForms />
        <ProductSearchActions onSearch={handleSearch} />
      </FormProvider>
      <ul className="grid grid-cols-1 desktop:grid-cols-2 gap-4">
        {data?.pages
          .flatMap(page => page.products)
          .map(product => (
            <li key={product.productId}>
              <ProductLinkCard
                product={product}
                href={`/detail/${product.itemKey}?from=search`}
              />
            </li>
          ))}
      </ul>
      <IntersectionDetector onDetect={handleIntersectionDetect} />
    </MainLayout>
  )
}
