import { getCustomers } from '@entities/customer/api/getCustomers'
import { useCustomerFilterForm } from '@features/customer/model/useCustomerFilterForm'
import { useCustomerFilterUrlParams } from '@features/customer/model/useCustomerFilterUrlParams'
import { CustomerFilterActions } from '@features/customer/ui/CustomerFilterActions'
import { CustomerFilterForms } from '@features/customer/ui/CustomerFilterForms'
import { CustomerPagination } from '@features/customer/ui/CustomerPagination'
import { CustomerTable } from '@features/customer/ui/CustomerTable'
import { useStableLoading } from '@shared/hook/useStableLoading'
import { allToUndefined } from '@shared/util/form'
import { emptyToUndefined } from '@shared/util/string'
import { useQuery } from '@tanstack/react-query'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'
import { CustomerPageTop } from './CustomerPageTop'

export const CustomerPage = () => {
  const { urlParams, setUrlParams } = useCustomerFilterUrlParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['customers', urlParams],
    queryFn: () =>
      getCustomers({
        name: emptyToUndefined(urlParams.name),
        email: emptyToUndefined(urlParams.email),
        phone: emptyToUndefined(urlParams.phone),
        status: allToUndefined(urlParams.status),
        page: urlParams.page,
      }),
    refetchOnWindowFocus: false,
  })

  const { isStableLoading } = useStableLoading(isLoading || isFetching)

  const form = useCustomerFilterForm()

  const { reset, handleSubmit } = form

  const handleFilter = handleSubmit(data => {
    setUrlParams(data)
  })

  useEffect(() => {
    reset(urlParams)
  }, [urlParams, reset])

  return (
    <MainLayout>
      <CustomerPageTop />
      <FormProvider {...form}>
        <CustomerFilterForms />
        <CustomerFilterActions onFilter={handleFilter} />
        <CustomerTable
          data={data?.customers ?? []}
          isLoading={isStableLoading}
        />
        <CustomerPagination
          totalPages={data?.totalPages ?? 0}
          onFilter={handleFilter}
        />
      </FormProvider>
    </MainLayout>
  )
}
