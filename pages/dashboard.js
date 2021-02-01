import useSWR from 'swr'

import { useAuth } from '@/lib/auth'
import fetcher from '@/utils/fetcher'
import DashboardShell from '@/componentsßnts/SiteTableSkeleton'
import SiteTable from '@/components/SiteTable'
import SiteTableHeader from '@/components/SiteTableHeader'

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

  return (
    <DashboardShell>
      <SiteTableHeader />
      {data.sites.length === 0 ? <EmptyState /> : <SiteTable sites={data.sites} />}
    </DashboardShell>
  )
}

export default Dashboard
