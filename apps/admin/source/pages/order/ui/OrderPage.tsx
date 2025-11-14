import { getOrders } from '@entities/order/api/getOrders'
import { useOrderFilterForm } from '@features/order/model/useOrderFilterForm'
import { useOrderFilterUrlParams } from '@features/order/model/useOrderFilterUrlParams'
import { OrderFilterActions } from '@features/order/ui/OrderFilterActions'
import { OrderFilterForms } from '@features/order/ui/OrderFilterForms'
import { OrderPagination } from '@features/order/ui/OrderPagination'
import { OrderTable } from '@features/order/ui/OrderTable'
import { useStableLoading } from '@shared/hook/useStableLoading'
import { allToUndefined } from '@shared/util/form'
import { emptyToUndefined } from '@shared/util/string'
import { useQuery } from '@tanstack/react-query'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'
import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'

export const OrderPage = () => {
  const { urlParams, setUrlParams } = useOrderFilterUrlParams()

  const { data, isFetching } = useQuery({
    queryKey: ['orders', JSON.stringify(urlParams)],
    queryFn: () =>
      getOrders({
        query: emptyToUndefined(urlParams.query),
        status: allToUndefined(urlParams.status),
        page: urlParams.page,
      }),
    refetchOnWindowFocus: false,
  })

  const { isStableLoading } = useStableLoading(isFetching)

  const form = useOrderFilterForm()

  const { reset, handleSubmit } = form

  const handleFilter = handleSubmit(data => {
    setUrlParams(data)
  })

  useEffect(() => {
    reset(urlParams)
  }, [urlParams, reset])

  return (
    <MainLayout>
      <PageTop title="주문 관리" description="전체 주문 내역을 관리합니다." />
      <FormProvider {...form}>
        <OrderFilterForms />
        <OrderFilterActions onFilter={handleFilter} />
        <OrderTable data={data?.orders ?? []} isLoading={isStableLoading} />
        <OrderPagination
          totalPages={data?.totalPages ?? 0}
          onFilter={handleFilter}
        />
      </FormProvider>
    </MainLayout>
  )
}
