import { cn } from '@shared/util/cn'
import { toPrice } from '@shared/util/format'
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

const priceHistory = [
  {
    date: new Date('2025-01-01'),
    price: 990000,
  },
  {
    date: new Date('2025-01-02'),
    price: 1000000,
  },
  {
    date: new Date('2025-01-03'),
    price: 1100000,
  },
  {
    date: new Date('2025-01-04'),
    price: 1050000,
  },
  {
    date: new Date('2025-01-05'),
    price: 1200000,
  },
  {
    date: new Date('2025-01-06'),
    price: 1000000,
  },
  {
    date: new Date('2025-01-07'),
    price: 880000,
  },
]

export const ProductPriceCard = () => {
  return (
    <div className={containerTw}>
      <div className={titleTw}>
        <TrendingUp className="size-4 text-gray-800" />
        <h3>최근 일주일 평균 시세</h3>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={priceHistory}>
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

const containerTw = cn`flex flex-col gap-4 p-4 border border-gray-200 bg-white rounded-sm`

const titleTw = cn`flex items-center gap-2`
