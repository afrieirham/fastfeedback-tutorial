import useSWR from 'swr'

import { useAuth } from '@/lib/auth'
import fetcher from '@/utils/fetcher'
import DashboardShell from '@/components/DashboardShell'
import FeedbackEmptyState from '@/components/FeedbackEmptyState'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import FeedbackTable from '@/components/FeedbackTable'
import FeedbackTableHeader from '@/components/FeedbackTableHeader'
import { useRouter } from 'next/router'

function SiteFeedback() {
  const router = useRouter()
  const { user } = useAuth()
  const { data } = useSWR(user && [`/api/feedback/${router.query.siteId}`, user.token], fetcher)

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
      <FeedbackTableHeader site={data.site} />
      {data.feedback.length === 0 ? (
        <FeedbackEmptyState />
      ) : (
        <FeedbackTable allFeedback={data.feedback} />
      )}
    </DashboardShell>
  )
}

export default SiteFeedback
