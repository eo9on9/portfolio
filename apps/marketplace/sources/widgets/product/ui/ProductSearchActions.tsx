import { Beacon, Button } from '@repo/ui-common'
import {
  PRODUCT_SEARCH_FORM_DEFAULT_VALUES,
  ProductSearchForm,
} from '@widgets/product/model/useProductSearchForm'
import { FunnelX, Search } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

interface ProductSearchActionsProps {
  onSearch?: () => void
}

export const ProductSearchActions = ({
  onSearch,
}: ProductSearchActionsProps) => {
  const { reset } = useFormContext<ProductSearchForm>()

  return (
    <div className="flex items-center gap-2 justify-between">
      <Beacon className="order-2">
        <Button variant="primary" size="lg" onClick={onSearch}>
          <Search className="w-4 h-4" />
          검색
        </Button>
      </Beacon>
      <Beacon className="order-1">
        <Button
          variant="ghost"
          size="lg"
          onClick={() => {
            reset(PRODUCT_SEARCH_FORM_DEFAULT_VALUES)
            onSearch?.()
          }}
        >
          <FunnelX className="w-4 h-4" />
          검색 초기화
        </Button>
      </Beacon>
    </div>
  )
}
