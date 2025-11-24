import { getPriceHistory } from '@features/product/api/getPriceHistory'
import { toPrice } from '@shared/util/format'
import { useQuery } from '@tanstack/react-query'
import { TrendingUp } from 'lucide-react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export const ProductPriceCard = () => {
  const { data } = useQuery({
    queryKey: ['price-history'],
    queryFn: getPriceHistory,
  })

  if (!data) return null

  return (
    <div className="flex flex-col gap-4 p-4 border border-gray-200 bg-white rounded-sm">
      <div className="flex items-center gap-2">
        <TrendingUp className="size-4 text-gray-800" />
        <h3>최근 일주일 시세 변동</h3>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data.priceHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={date => `${date.getMonth() + 1}/${date.getDate()}`}
            />
            <YAxis tickFormatter={value => `${(value / 1000).toFixed(0)}K`} />
            <Tooltip
              formatter={(value: number) => [`${toPrice(value)} G`, '가격']}
              labelFormatter={date =>
                new Date(date).toLocaleDateString('ko-KR')
              }
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="var(--color-blue-500)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
