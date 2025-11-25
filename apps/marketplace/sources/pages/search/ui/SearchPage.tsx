import {
  getProducts,
  GetProductsParams,
  GetProductsRes,
} from '@features/product/api/getProducts'
import { ProductCard } from '@features/product/ui/ProductCard'
import { IntersectionDetector } from '@shared/ui/IntersectionDetector'
import { allToUndefined, emptyToUndefined } from '@shared/util/form'
import { useInfiniteQuery } from '@tanstack/react-query'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'
import { useProductFilterForm } from '@widgets/product/model/useProductFilterForm'
import { useProductFilterUrlParams } from '@widgets/product/model/useProductFilterUrlParams'
import { ProductFilterActions } from '@widgets/product/ui/ProductFilterActions'
import { ProductFilterForms } from '@widgets/product/ui/ProductFilterForms'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'

export const SearchPage = () => {
  const router = useRouter()

  const { urlParams, setUrlParams } = useProductFilterUrlParams()

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['product', 'filter', JSON.stringify(urlParams)],
      getNextPageParam: (lastPage: GetProductsRes) =>
        lastPage.page < lastPage.totalPages
          ? {
              page: lastPage.page + 1,
              name: emptyToUndefined(urlParams.name),
              category: allToUndefined(urlParams.category),
              grade: allToUndefined(urlParams.grade),
              type: allToUndefined(urlParams.type),
            }
          : undefined,
      initialPageParam: {
        page: 1,
        name: emptyToUndefined(urlParams.name),
        category: allToUndefined(urlParams.category),
        grade: allToUndefined(urlParams.grade),
        type: allToUndefined(urlParams.type),
      } as GetProductsParams,
      queryFn: ({ pageParam }) =>
        getProducts({
          ...pageParam,
        }),
      retry: false,
    })

  const form = useProductFilterForm()

  const { reset, handleSubmit } = form

  const handleFilter = handleSubmit(data => {
    setUrlParams(data)
  })

  const products = data?.pages.flatMap(page => page.products) ?? []

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
        <ProductFilterForms />
        <ProductFilterActions onFilter={handleFilter} />
      </FormProvider>
      <ul className="grid grid-cols-1 desktop:grid-cols-2 gap-4">
        {products.map(product => (
          <li key={product.id}>
            <ProductCard
              productId={product.id}
              itemKey={product.itemKey}
              type={product.type}
              price={product.price}
              amount={product.amount}
              createdAt={product.createdAt}
              onClick={() =>
                router.push(`/detail/${product.itemKey}?from=search`)
              }
            />
          </li>
        ))}
      </ul>
      <IntersectionDetector onDetect={handleIntersectionDetect} />
    </MainLayout>
  )
}
