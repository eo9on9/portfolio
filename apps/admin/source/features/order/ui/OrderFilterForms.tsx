import { ORDER_STATUS_LABELS } from '@entities/order/model/orderStatus'
import { OrderFilterForm } from '@features/order/model/useOrderFilterForm'
import { Input } from '@shared/ui/Input'
import { Select } from '@shared/ui/Select'
import { withAll } from '@shared/util/form'
import { Controller, useFormContext } from 'react-hook-form'

interface OrderFilterFormsProps {
  onFilter?: () => void
}

const STATUS_OPTIONS = withAll(
  Object.entries(ORDER_STATUS_LABELS).map(([key, value]) => ({
    label: value,
    value: key,
  })),
)

export const OrderFilterForms = ({ onFilter }: OrderFilterFormsProps) => {
  const { control, register } = useFormContext<OrderFilterForm>()

  return (
    <form>
      <div className="grid grid-cols-[5fr_3fr] gap-2">
        <Input
          placeholder="주문 검색 (주문 번호, 고객명, 상품명)"
          {...register('query')}
        />
        <Controller
          control={control}
          name="status"
          render={({ field }) => <Select options={STATUS_OPTIONS} {...field} />}
        />
      </div>
      <button type="submit" hidden onClick={onFilter} />
    </form>
  )
}
