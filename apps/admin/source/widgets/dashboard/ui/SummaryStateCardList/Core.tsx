import { toCompactNumber } from '@shared/util/format'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getSummaryStates } from '@widgets/dashboard/api/getSummaryStates'
import { SUMMARY_STATE_CATEGORY_LABELS } from '@widgets/dashboard/model/summaryStateCategory'
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react'
import { SummaryStateCard } from '../SummaryStateCard'

export const Core = () => {
  const { data: states } = useSuspenseQuery({
    queryKey: ['summary-states'],
    queryFn: getSummaryStates,
  })

  return (
    <div className="grid grid-cols-4 gap-2">
      <SummaryStateCard
        title={`총 ${SUMMARY_STATE_CATEGORY_LABELS.customer}`}
        icon={<Users className={iconCn} />}
        content={states?.customer.total.toLocaleString()}
        percentage={states?.customer.percentage}
      />
      <SummaryStateCard
        title={`총 ${SUMMARY_STATE_CATEGORY_LABELS.order}`}
        icon={<ShoppingCart className={iconCn} />}
        content={states?.order.total.toLocaleString()}
        percentage={states?.order.percentage}
      />
      <SummaryStateCard
        title={`총 ${SUMMARY_STATE_CATEGORY_LABELS.product}`}
        icon={<Package className={iconCn} />}
        content={states?.product.total.toLocaleString()}
        percentage={states?.product.percentage}
      />
      <SummaryStateCard
        title={`총 ${SUMMARY_STATE_CATEGORY_LABELS.sales}`}
        icon={<DollarSign className={iconCn} />}
        content={`₩${toCompactNumber(states?.sales.total ?? 0)}`}
        percentage={states?.sales.percentage}
      />
    </div>
  )
}

const iconCn = 'w-4 h-4 text-gray-500'
