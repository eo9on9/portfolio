import { getSalesRate } from '@entities/sales/api/getSalesRate'
import { Card } from '@shared/ui/Card'
import { useSuspenseQuery } from '@tanstack/react-query'
import { PieChartIcon } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = [
  'var(--color-blue-400)',
  'var(--color-green-400)',
  'var(--color-yellow-400)',
  'var(--color-orange-400)',
]

export const Core = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['sales-rate'],
    queryFn: getSalesRate,
  })

  return (
    <Card
      title="카테고리별 판매 비율"
      icon={<PieChartIcon className="w-4 h-4 text-gray-500" />}
    >
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={entry => entry.name}
            outerRadius={80}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                fontSize="var(--text-xs)"
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              fontSize: 'var(--text-xs)',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}
