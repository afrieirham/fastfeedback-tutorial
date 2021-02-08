import { useState } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'

import { getAllFeedback, getAllSites } from '@/lib/db-admin'
import Feedback from '@/components/Feedback'
import FeedbackLink from '@/components/FeedbackLink'

export async function getStaticProps(context) {
  const { siteId } = context.params
  const { feedback } = await getAllFeedback(siteId)
  return {
    props: {
      initialFeedback: feedback,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const { sites } = await getAllSites()
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

function SiteFeedback({ initialFeedback }) {
  const router = useRouter()
  const [allFeedback] = useState(initialFeedback)

  return (
    <Box display='flex' flexDirection='column'>
      <FeedbackLink siteId={router.query.siteId} />
      {allFeedback.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  )
}

export default SiteFeedback
