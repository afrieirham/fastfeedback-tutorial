import useSWR from 'swr'
import { useRouter } from 'next/router'

import { useAuth } from '@/lib/auth'
import fetcher from '@/utils/fetcher'
import DashboardShell from '@/components/DashboardShell'
import SiteHeader from '@/components/SiteHeader'
import Feedback from '@/components/Feedback'
import FeedbackForm from '@/components/FeedbackForm'
import SiteFeedbackSkeleton from '@/components/SiteFeedbackSkeleton'

function SiteFeedback() {
  const router = useRouter()

  const [siteId, route] = router.query.site || []
  const { user } = useAuth()
  const { data } = useSWR(user && [`/api/feedback/${siteId}/${route ?? ''}`, user.token], fetcher)

  if (!data) {
    return (
      <DashboardShell>
        <SiteFeedbackSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <SiteHeader isOwner={data.site?.authorId === user?.uid} site={data.site} route={route} />
      <FeedbackForm siteId={siteId} route={route} user={user} />
      {Boolean(data?.feedback?.length) &&
        data?.feedback.map((feedback) => <Feedback key={feedback.id} {...feedback} />)}
    </DashboardShell>
  )
}

export default SiteFeedback
