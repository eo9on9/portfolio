import { CUSTOMER_STATUS_LABELS } from '@entities/customer/model/customerStatus'
import { CustomerFilterForm } from '@features/customer/model/useCustomerFilterForm'
import {
  VALIDATION_EMAIL,
  VALIDATION_NAME,
  VALIDATION_PHONE,
} from '@shared/constant/validation'
import { FormField } from '@shared/ui/FormField'
import { Input } from '@shared/ui/Input'
import { Select } from '@shared/ui/Select'
import { withAll } from '@shared/util/form'
import { Controller, useFormContext } from 'react-hook-form'

const STATUS_OPTIONS = withAll(
  Object.entries(CUSTOMER_STATUS_LABELS).map(([key, value]) => ({
    label: value,
    value: key,
  })),
)

export const CustomerFilterForms = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<CustomerFilterForm>()

  return (
    <div className="grid grid-cols-2 gap-2">
      <FormField label="이름" errorMessage={errors.name?.message}>
        <Input
          placeholder="고객 이름을 입력하세요"
          isError={!!errors.name}
          {...register('name', {
            pattern: {
              value: VALIDATION_NAME.pattern,
              message: VALIDATION_NAME.message,
            },
          })}
        />
      </FormField>
      <FormField label="이메일" errorMessage={errors.email?.message}>
        <Input
          placeholder="example@email.com"
          isError={!!errors.email}
          {...register('email', {
            pattern: {
              value: VALIDATION_EMAIL.pattern,
              message: VALIDATION_EMAIL.message,
            },
          })}
        />
      </FormField>
      <FormField label="전화번호" errorMessage={errors.phone?.message}>
        <Input
          placeholder="010-1234-5678"
          isError={!!errors.phone}
          {...register('phone', {
            pattern: {
              value: VALIDATION_PHONE.pattern,
              message: VALIDATION_PHONE.message,
            },
          })}
        />
      </FormField>
      <FormField label="상태">
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <Select
              options={STATUS_OPTIONS}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />
      </FormField>
    </div>
  )
}
