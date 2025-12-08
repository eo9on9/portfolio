import { OrderFilterForm } from '@features/order/model/useOrderFilterForm'
import { Beacon, Pagination } from '@repo/ui-common'
import { Controller, useFormContext } from 'react-hook-form'

interface OrderPaginationProps {
  totalPages: number
  onFilter?: () => void
}

export const OrderPagination = ({
  totalPages,
  onFilter,
}: OrderPaginationProps) => {
  const { control } = useFormContext<OrderFilterForm>()

  return (
    <Beacon className="w-fit mx-auto">
      <Controller
        control={control}
        name="page"
        render={({ field }) => (
          <Pagination
            totalPages={totalPages}
            currentPage={field.value}
            onPageChange={page => {
              field.onChange(page)
              onFilter?.()
            }}
          />
        )}
      />
    </Beacon>
  )
}
