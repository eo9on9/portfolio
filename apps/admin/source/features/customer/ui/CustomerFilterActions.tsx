import {
  CUSTOMER_FILTER_FORM_DEFAULT_VALUES,
  CustomerFilterForm,
} from '@features/customer/model/useCustomerFilterForm'
import { Beacon } from '@shared/ui/Beacon'
import { Button } from '@shared/ui/Button'
import { FunnelX, Search } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

interface CustomerFilterActionsProps {
  onFilter?: () => void
}

export const CustomerFilterActions = ({
  onFilter,
}: CustomerFilterActionsProps) => {
  const { reset, setValue } = useFormContext<CustomerFilterForm>()

  return (
    <div className="flex items-center gap-2 justify-between">
      <Beacon>
        <Button
          variant="ghost"
          size="lg"
          onClick={() => {
            reset(CUSTOMER_FILTER_FORM_DEFAULT_VALUES)
            onFilter?.()
          }}
        >
          <FunnelX className="w-4 h-4" />
          필터 초기화
        </Button>
      </Beacon>
      <Beacon>
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            setValue('page', 1)
            onFilter?.()
          }}
        >
          <Search className="w-4 h-4" />
          검색
        </Button>
      </Beacon>
    </div>
  )
}
