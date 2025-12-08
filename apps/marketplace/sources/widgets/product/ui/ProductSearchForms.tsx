import { ITEM_CATEGORY_LABELS } from '@entities/item/model/itemCategory'
import { ITEM_GRADE_LABELS } from '@entities/item/model/itemGrade'
import { PRODUCT_TYPE_LABELS } from '@features/product/model/productType'
import { FormField, Input } from '@repo/ui-common'
import { Select } from '@shared/ui/Select'
import { withAll } from '@shared/util/form'
import { ProductSearchForm } from '@widgets/product/model/useProductSearchForm'
import { Search } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'

export const ProductSearchForms = () => {
  const { control, register } = useFormContext<ProductSearchForm>()

  return (
    <div className="flex flex-col gap-2">
      <FormField label="이름">
        <Input
          icon={<Search className="size-4 text-gray-400" />}
          {...register('name')}
        />
      </FormField>
      <div className="grid grid-cols-1 tablet:grid-cols-3 gap-2">
        <FormField label="카테고리">
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select
                options={withAll(
                  Object.entries(ITEM_CATEGORY_LABELS).map(([key, value]) => ({
                    label: value,
                    value: key,
                  })),
                )}
                {...field}
              />
            )}
          />
        </FormField>
        <FormField label="등급">
          <Controller
            control={control}
            name="grade"
            render={({ field }) => (
              <Select
                options={withAll(
                  Object.entries(ITEM_GRADE_LABELS).map(([key, value]) => ({
                    label: value,
                    value: key,
                  })),
                )}
                {...field}
              />
            )}
          />
        </FormField>
        <FormField label="거래 유형">
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select
                options={withAll(
                  Object.entries(PRODUCT_TYPE_LABELS).map(([key, value]) => ({
                    label: value,
                    value: key,
                  })),
                )}
                {...field}
              />
            )}
          />
        </FormField>
      </div>
    </div>
  )
}
