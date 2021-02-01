import useSWR from 'swr'

import { useAuth } from '@/lib/auth'
import fetcher from '@/utils/fetcher'
import DashboardShell from '@/components/DashboardShell'
import EmptyState from '@/components/EmptyState'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import FeedbackTable from '@/components/FeedbackTable'
import FeedbackTableHeader from '@/components/FeedbackTableHeader'

function MyFeedback() {
  const { user } = useAuth()
  const { data } = useSWR(user && ['/api/feedback', user.token], fetcher)

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {data.feedback.length === 0 ? <EmptyState /> : <FeedbackTable allFeedback={data.feedback} />}
    </DashboardShell>
  )
}

export default MyFeedback