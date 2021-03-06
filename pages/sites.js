import useSWR from 'swr'

import { useAuth } from '@/lib/auth'
import fetcher from '@/utils/fetcher'
import DashboardShell from '@/components/DashboardShell'
import SiteTable from '@/components/SiteTable'
import SiteTableHeader from '@/components/SiteTableHeader'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import EmptyState from '@/components/EmptyState'
import FreePlanEmptyState from '@/components/FreePlanEmptyState'

function Dashboard() {
  const { user } = useAuth()
  const { data } = useSWR(user && ['/api/sites', user.token], fetcher)

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  if (!user?.stripeRole) {
    return (
      <DashboardShell>
        <SiteTableHeader isFreeAccount />
        <FreePlanEmptyState />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <SiteTableHeader />
      {data.sites.length === 0 ? <EmptyState /> : <SiteTable sites={data.sites} />}
    </DashboardShell>
  )
}

export default Dashboard
