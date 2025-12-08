import {
  ORDER_FILTER_FORM_DEFAULT_VALUES,
  OrderFilterForm,
} from '@features/order/model/useOrderFilterForm'
import { Beacon } from '@repo/ui-common'
import { Button } from '@shared/ui/Button'
import { FunnelX, Search } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

interface OrderFilterActionsProps {
  onFilter?: () => void
}

export const OrderFilterActions = ({ onFilter }: OrderFilterActionsProps) => {
  const { reset, setValue } = useFormContext<OrderFilterForm>()

  return (
    <div className="flex items-center gap-2 justify-between">
      <Beacon className="order-2">
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
      <Beacon className="order-1">
        <Button
          variant="ghost"
          size="lg"
          onClick={() => {
            reset(ORDER_FILTER_FORM_DEFAULT_VALUES)
            onFilter?.()
          }}
        >
          <FunnelX className="w-4 h-4" />
          필터 초기화
        </Button>
      </Beacon>
    </div>
  )
}
