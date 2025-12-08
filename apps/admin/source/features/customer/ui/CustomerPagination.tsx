import { CustomerFilterForm } from '@features/customer/model/useCustomerFilterForm'
import { Beacon, Pagination } from '@repo/ui-common'
import { Controller, useFormContext } from 'react-hook-form'

interface CustomerPaginationProps {
  totalPages: number
  onFilter?: () => void
}

export const CustomerPagination = ({
  totalPages,
  onFilter,
}: CustomerPaginationProps) => {
  const { control } = useFormContext<CustomerFilterForm>()

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
