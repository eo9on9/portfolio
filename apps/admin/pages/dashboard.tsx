import { DashboardPage } from '@pages/dashboard/ui/DashboardPage'
import dynamic from 'next/dynamic'

export default dynamic(() => Promise.resolve(DashboardPage), {
  ssr: false,
})
