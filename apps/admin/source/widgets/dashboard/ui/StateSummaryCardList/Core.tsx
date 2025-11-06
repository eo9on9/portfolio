import { toCompactNumber } from '@shared/util/format'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getStateSummaries } from '@widgets/dashboard/api/getSummaryStates'
import { STATE_SUMMARY_CATEGORY_LABELS } from '@widgets/dashboard/model/stateSummaryCategory'
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react'
import { StateSummaryCard } from '../StateSummaryCard'

export const Core = () => {
  const { data: states } = useSuspenseQuery({
    queryKey: ['summary-states'],
    queryFn: getStateSummaries,
  })

  return (
    <div className="grid grid-cols-4 gap-2">
      <StateSummaryCard
        title={`총 ${STATE_SUMMARY_CATEGORY_LABELS.customer}`}
        icon={<Users className={iconCn} />}
        content={states?.customer.total.toLocaleString()}
        percentage={states?.customer.percentage}
      />
      <StateSummaryCard
        title={`총 ${STATE_SUMMARY_CATEGORY_LABELS.order}`}
        icon={<ShoppingCart className={iconCn} />}
        content={states?.order.total.toLocaleString()}
        percentage={states?.order.percentage}
      />
      <StateSummaryCard
        title={`총 ${STATE_SUMMARY_CATEGORY_LABELS.product}`}
        icon={<Package className={iconCn} />}
        content={states?.product.total.toLocaleString()}
        percentage={states?.product.percentage}
      />
      <StateSummaryCard
        title={`총 ${STATE_SUMMARY_CATEGORY_LABELS.sales}`}
        icon={<DollarSign className={iconCn} />}
        content={`₩${toCompactNumber(states?.sales.total ?? 0)}`}
        percentage={states?.sales.percentage}
      />
    </div>
  )
}

const iconCn = 'w-4 h-4 text-gray-500'
