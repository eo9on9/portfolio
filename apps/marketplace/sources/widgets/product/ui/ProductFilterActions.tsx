import { Beacon } from '@shared/ui/Beacon'
import { Button } from '@shared/ui/Button'
import {
  PRODUCT_FILTER_FORM_DEFAULT_VALUES,
  ProductFilterForm,
} from '@widgets/product/model/useProductFilterForm'
import { FunnelX, Search } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

interface ProductFilterActionsProps {
  onFilter?: () => void
}

export const ProductFilterActions = ({
  onFilter,
}: ProductFilterActionsProps) => {
  const { reset } = useFormContext<ProductFilterForm>()

  return (
    <div className="flex items-center gap-2 justify-between">
      <Beacon className="order-2">
        <Button variant="primary" size="lg" onClick={onFilter}>
          <Search className="w-4 h-4" />
          검색
        </Button>
      </Beacon>
      <Beacon className="order-1">
        <Button
          variant="ghost"
          size="lg"
          onClick={() => {
            reset(PRODUCT_FILTER_FORM_DEFAULT_VALUES)
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
