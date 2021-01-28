import useSWR from 'swr'

import DashboardShell from '@/components/DashboardShell'
import EmptyState from '@/components/EmptyState'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import fetcher from '@/utils/fetcher'
import SiteTable from '@/components/SiteTable'

function Dashboard() {
  const { data: sites } = useSWR('/api/sites', fetcher)

  if (!sites) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      {sites.length === 0 ? <EmptyState /> : <SiteTable sites={sites} />}
    </DashboardShell>
  )
}

export default Dashboard
