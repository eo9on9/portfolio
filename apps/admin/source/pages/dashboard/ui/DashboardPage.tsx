import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'
import {
  ChartLine,
  DollarSign,
  List,
  Package,
  PieChart as PieChartIcon,
  ShoppingCart,
  Users,
} from 'lucide-react'
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const salesData = [
  { name: '1월', 매출: 4000, 주문: 2400 },
  { name: '2월', 매출: 3000, 주문: 1398 },
  { name: '3월', 매출: 2000, 주문: 9800 },
  { name: '4월', 매출: 2780, 주문: 3908 },
  { name: '5월', 매출: 1890, 주문: 4800 },
  { name: '6월', 매출: 2390, 주문: 3800 },
]

const categoryData = [
  { name: '전자제품', value: 400 },
  { name: '의류', value: 300 },
  { name: '식품', value: 300 },
  { name: '도서', value: 200 },
]

const COLORS = [
  'var(--color-blue-400)',
  'var(--color-green-400)',
  'var(--color-yellow-400)',
  'var(--color-orange-400)',
]

export const DashboardPage = () => {
  return (
    <MainLayout>
      <PageTop title="대시보드" description="전체 현황을 확인하세요." />
      <div className="grid grid-cols-4 gap-2">
        {/* Card */}
        <div className="flex flex-col gap-6 border border-gray-200 bg-white rounded-sm p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-800">총 고객</p>
            <Users className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xl font-medium text-gray-800">2,345</p>
            <p className="flex items-center gap-1 text-xs">
              <span className="text-green-500">+12.5%</span>
              <span className="text-gray-500">지난달 대비</span>
            </p>
          </div>
        </div>
        {/* Card */}
        <div className="flex flex-col gap-6 border border-gray-200 bg-white rounded-sm p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-800">총 주문</p>
            <ShoppingCart className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xl font-medium text-gray-800">1,234</p>
            <p className="flex items-center gap-1 text-xs">
              <span className="text-green-500">+8.2%</span>
              <span className="text-gray-500">지난달 대비</span>
            </p>
          </div>
        </div>
        {/* Card */}
        <div className="flex flex-col gap-6 border border-gray-200 bg-white rounded-sm p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-800">총 상품</p>
            <Package className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xl font-medium text-gray-800">567</p>
            <p className="flex items-center gap-1 text-xs">
              <span className="text-green-500">+4.1%</span>
              <span className="text-gray-500">지난달 대비</span>
            </p>
          </div>
        </div>
        {/* Card */}
        <div className="flex flex-col gap-6 border border-gray-200 bg-white rounded-sm p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-800">총 매출</p>
            <DollarSign className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xl font-medium text-gray-800">₩45.2M</p>
            <p className="flex items-center gap-1 text-xs">
              <span className="text-green-500">+15.3%</span>
              <span className="text-gray-500">지난달 대비</span>
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-6 border border-gray-200 bg-white rounded-sm p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-800">
              월별 매출 및 주문 추이
            </p>
            <ChartLine className="w-4 h-4 text-gray-500" />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis
                dataKey="name"
                stroke="var(--color-gray-500)"
                fontSize="12px"
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
              {/* <Legend /> */}
              <Line
                type="monotone"
                dataKey="매출"
                stroke="var(--color-blue-400)"
                strokeWidth={1}
              />
              <Line
                type="monotone"
                dataKey="주문"
                stroke="var(--color-green-400)"
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-6 border border-gray-200 bg-white rounded-sm p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-800">
              카테고리별 판매 비율
            </p>
            <PieChartIcon className="w-4 h-4 text-gray-500" />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={entry => entry.name}
                outerRadius={80}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
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
        </div>
      </div>
      <div className="flex flex-col gap-6 border border-gray-200 bg-white rounded-sm p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-800">최근 주문 내역</p>
          <List className="w-4 h-4 text-gray-500" />
        </div>
        <ul>
          <li className="grid grid-cols-4 not-last:mb-4 not-last:pb-4 not-last:border-b border-gray-200">
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-sm text-gray-800">ORD-001</p>
              <p className="text-xs text-gray-500">김철수</p>
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-sm text-gray-800">노트북</p>
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-sm text-gray-800 text-right">₩1,500,000</p>
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-sm text-gray-800 text-right">배송중</p>
            </div>
          </li>
          <li className="grid grid-cols-4 not-last:mb-4 not-last:pb-4 not-last:border-b border-gray-200">
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-sm text-gray-800">ORD-001</p>
              <p className="text-xs text-gray-500">김철수</p>
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-sm text-gray-800">유선 프린터</p>
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-sm text-gray-800 text-right">₩500,000</p>
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-sm text-gray-800 text-right">배송중</p>
            </div>
          </li>
          <li className="grid grid-cols-4 not-last:mb-4 not-last:pb-4 not-last:border-b border-gray-200">
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-sm text-gray-800">ORD-001</p>
              <p className="text-xs text-gray-500">김철수</p>
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-sm text-gray-800">스마트폰</p>
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-sm text-gray-800 text-right">₩12,500,000</p>
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-sm text-gray-800 text-right">배송중</p>
            </div>
          </li>
          <li className="grid grid-cols-4 not-last:mb-4 not-last:pb-4 not-last:border-b border-gray-200">
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-sm text-gray-800">ORD-001</p>
              <p className="text-xs text-gray-500">김철수</p>
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-sm text-gray-800">USB-C 허브</p>
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-sm text-gray-800 text-right">₩40,000</p>
            </div>
            <div className="flex flex-col gap-1 justify-center">
              <p className="text-sm text-gray-800 text-right">배송중</p>
            </div>
          </li>
        </ul>
      </div>
    </MainLayout>
  )
}
