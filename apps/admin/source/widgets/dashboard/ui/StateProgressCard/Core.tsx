import { Card } from '@shared/ui/Card'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getStateProgress } from '@widgets/dashboard/api/getStateProgress'
import { STATE_CATEGORY_LABELS } from '@widgets/dashboard/model/stateCategory'
import { ChartLine } from 'lucide-react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export const Core = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['state-progress'],
    queryFn: getStateProgress,
  })

  const chartData = data.map(item => ({
    name: item.name,
    [STATE_CATEGORY_LABELS.sales]: item.sales,
    [STATE_CATEGORY_LABELS.order]: item.order,
  }))

  return (
    <Card
      title="월별 매출 및 주문 추이"
      icon={<ChartLine className="w-4 h-4 text-gray-500" />}
    >
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis
            dataKey="name"
            stroke="var(--color-gray-500)"
            fontSize="var(--text-xs)"
          />
          <YAxis stroke="var(--color-gray-500)" fontSize="var(--text-xs)" />
          <Tooltip
            labelStyle={{
              fontSize: 'var(--text-xs)',
            }}
            contentStyle={{
              fontSize: 'var(--text-xs)',
            }}
          />
          <Line
            type="monotone"
            dataKey={STATE_CATEGORY_LABELS.sales}
            stroke="var(--color-blue-400)"
            strokeWidth={1}
          />
          <Line
            type="monotone"
            dataKey={STATE_CATEGORY_LABELS.order}
            stroke="var(--color-green-400)"
            strokeWidth={1}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
