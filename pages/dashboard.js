import useSWR from 'swr'

import DashboardShell from '@/components/DashboardShell'
import EmptyState from '@/components/EmptyState'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import fetcher from '@/utils/fetcher'
import SiteTable from '@/components/SiteTable'
import { useAuth } from '@/lib/auth'

function Dashboard() {
  const { user } = useAuth()
  const { data } = useSWR(user && ['/api/sites', user.token], fetcher)

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      {data.sites.length === 0 ? <EmptyState /> : <SiteTable sites={data.sites} />}
    </DashboardShell>
  )
}

export default Dashboard
