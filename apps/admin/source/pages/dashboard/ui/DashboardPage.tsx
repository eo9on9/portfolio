import { StateProgressCard } from '@widgets/dashboard/ui/StateProgressCard'
import { StateSummaryCardList } from '@widgets/dashboard/ui/StateSummaryCardList'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'
import { List, PieChart as PieChartIcon } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

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
      <StateSummaryCardList />
      <div className="grid grid-cols-2 gap-2">
        <StateProgressCard />
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
