import { KindOfItemCategory } from '@entities/item/model/itemCategory'
import { KindOfItemGrade } from '@entities/item/model/itemGrade'
import { KindOfProductType } from '@features/product/model/productType'
import { ALL_VALUE, WithAll } from '@shared/util/form'
import { useForm } from 'react-hook-form'

export interface ProductSearchForm {
  name: string
  category: WithAll<KindOfItemCategory>
  grade: WithAll<KindOfItemGrade>
  type: WithAll<KindOfProductType>
}

export const PRODUCT_SEARCH_FORM_DEFAULT_VALUES: ProductSearchForm = {
  name: '',
  category: ALL_VALUE,
  grade: ALL_VALUE,
  type: ALL_VALUE,
}

export const useProductSearchForm = () => {
  return useForm<ProductSearchForm>({
    defaultValues: PRODUCT_SEARCH_FORM_DEFAULT_VALUES,
  })
}
