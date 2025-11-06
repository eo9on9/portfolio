import { getRecentOrders } from '@entities/order/api/getRecentOrders'
import { ORDER_STATUS_LABELS } from '@entities/order/model/orderStatus'
import { Card } from '@shared/ui/Card'
import { useSuspenseQuery } from '@tanstack/react-query'
import { List } from 'lucide-react'

export const Core = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['recent-orders'],
    queryFn: getRecentOrders,
  })

  return (
    <Card
      title="최근 주문 내역"
      icon={<List className="w-4 h-4 text-gray-500" />}
    >
      <ul>
        {data.map(order => (
          <li
            key={order.orderId}
            className="grid grid-cols-4 items-center not-last:mb-4 not-last:pb-4 not-last:border-b border-gray-200 text-sm text-gray-800"
          >
            <div className="flex flex-col gap-1">
              <p>{order.orderId}</p>
              <p className="text-xs text-gray-500">{order.customer}</p>
            </div>
            <p>{order.productName}</p>
            <p className="text-right">₩{order.amount.toLocaleString()}</p>
            <p className="text-right">{ORDER_STATUS_LABELS[order.status]}</p>
          </li>
        ))}
      </ul>
    </Card>
  )
}
