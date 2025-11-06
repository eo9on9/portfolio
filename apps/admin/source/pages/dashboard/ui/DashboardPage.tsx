import { SalesRateCard } from '@widgets/dashboard/ui/SalesRateCard'
import { StateProgressCard } from '@widgets/dashboard/ui/StateProgressCard'
import { StateSummaryCardList } from '@widgets/dashboard/ui/StateSummaryCardList'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'
import { List } from 'lucide-react'

export const DashboardPage = () => {
  return (
    <MainLayout>
      <PageTop title="대시보드" description="전체 현황을 확인하세요." />
      <StateSummaryCardList />
      <div className="grid grid-cols-2 gap-2">
        <StateProgressCard />
        <SalesRateCard />
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
