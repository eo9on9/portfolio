import { RecentOrderListCard } from '@widgets/dashboard/ui/RecentOrderListCard'
import { SalesRateCard } from '@widgets/dashboard/ui/SalesRateCard'
import { StateProgressCard } from '@widgets/dashboard/ui/StateProgressCard'
import { StateSummaryCardList } from '@widgets/dashboard/ui/StateSummaryCardList'
import { MainLayout } from '@widgets/layout/ui/MainLayout'
import { PageTop } from '@widgets/layout/ui/PageTop'

export const DashboardPage = () => {
  return (
    <MainLayout>
      <PageTop title="대시보드" description="전체 현황을 확인하세요." />
      <StateSummaryCardList />
      <div className="grid grid-cols-2 gap-2">
        <StateProgressCard />
        <SalesRateCard />
      </div>
      <RecentOrderListCard />
    </MainLayout>
  )
}
