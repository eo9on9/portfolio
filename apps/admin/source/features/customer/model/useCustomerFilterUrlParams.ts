import { KindOfCustomerStatus } from '@entities/customer/model/customerStatus'
import { CustomerFilterForm } from '@features/customer/model/useCustomerFilterForm'
import { ALL_SELECT_OPTION, WithAll } from '@shared/util/form'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

export const useCustomerFilterUrlParams = () => {
  const router = useRouter()
  const params = useSearchParams()

  const urlParams: CustomerFilterForm = useMemo(
    () => ({
      name: params.get('name') ?? '',
      email: params.get('email') ?? '',
      phone: params.get('phone') ?? '',
      status: (params.get('status') ??
        ALL_SELECT_OPTION.value) as WithAll<KindOfCustomerStatus>,
      page: parseInt(params.get('page') ?? '1'),
    }),
    [params],
  )

  const setUrlParams = useCallback(
    (query: CustomerFilterForm) => {
      const q = new URLSearchParams()
      if (query.name) q.set('name', query.name)
      if (query.email) q.set('email', query.email)
      if (query.phone) q.set('phone', query.phone)
      if (query.status) q.set('status', query.status)
      if (query.page) q.set('page', query.page.toString())
      const qs = q.toString() ?? ''
      router.push(`?${qs}`)
    },
    [router],
  )

  return { urlParams, setUrlParams }
}
