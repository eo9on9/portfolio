import { KindOfItemCategory } from '@entities/item/model/itemCategory'
import { KindOfItemGrade } from '@entities/item/model/itemGrade'
import { KindOfProductType } from '@features/product/model/productType'
import { ALL_VALUE, WithAll } from '@shared/util/form'
import { ProductSearchForm } from '@widgets/product/model/useProductSearchForm'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

export const useProductSearchUrlParams = () => {
  const router = useRouter()
  const params = useSearchParams()

  const urlParams: ProductSearchForm = useMemo(
    () => ({
      name: params.get('name') ?? '',
      category: (params.get('category') ??
        ALL_VALUE) as WithAll<KindOfItemCategory>,
      grade: (params.get('grade') ?? ALL_VALUE) as WithAll<KindOfItemGrade>,
      type: (params.get('type') ?? ALL_VALUE) as WithAll<KindOfProductType>,
    }),
    [params],
  )

  const setUrlParams = useCallback(
    (query: ProductSearchForm) => {
      const q = new URLSearchParams()
      if (query.name) q.set('name', query.name)
      if (query.category) q.set('category', query.category)
      if (query.grade) q.set('grade', query.grade)
      if (query.type) q.set('type', query.type)
      const qs = q.toString() ?? ''
      router.push(`?${qs}`)
    },
    [router],
  )

  return { urlParams, setUrlParams }
}
