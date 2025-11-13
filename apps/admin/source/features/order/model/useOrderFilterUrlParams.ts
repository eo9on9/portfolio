import { KindOfOrderStatus } from '@entities/order/model/orderStatus'
import { OrderFilterForm } from '@features/order/model/useOrderFilterForm'
import { ALL_SELECT_OPTION, WithAll } from '@shared/util/form'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

export const useOrderFilterUrlParams = () => {
  const router = useRouter()
  const params = useSearchParams()

  const urlParams: OrderFilterForm = useMemo(
    () => ({
      query: params.get('query') ?? '',
      status: (params.get('status') ??
        ALL_SELECT_OPTION.value) as WithAll<KindOfOrderStatus>,
      page: parseInt(params.get('page') ?? '1'),
    }),
    [params],
  )

  const setUrlParams = useCallback(
    (query: OrderFilterForm) => {
      const q = new URLSearchParams()
      if (query.query) q.set('query', query.query)
      if (query.status) q.set('status', query.status)
      if (query.page) q.set('page', query.page.toString())
      const qs = q.toString() ?? ''
      router.push(`?${qs}`)
    },
    [router],
  )

  return { urlParams, setUrlParams }
}
