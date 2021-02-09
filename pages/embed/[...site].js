import { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Text } from '@chakra-ui/react'

import { getAllFeedback, getAllSites } from '@/lib/db-admin'
import Feedback from '@/components/Feedback'
import FeedbackLink from '@/components/FeedbackLink'

export async function getStaticProps(context) {
  const [siteId, route] = context.params.site
  const { feedback } = await getAllFeedback(siteId, route)
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
      site: [String(site.id)],
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

function EmbeddedFeedbackPage({ initialFeedback }) {
  const router = useRouter()

  return (
    <Box display='flex' flexDirection='column'>
      <FeedbackLink />
      {initialFeedback && initialFeedback.length ? (
        initialFeedback.map((feedback) => <Feedback key={feedback.id} {...feedback} />)
      ) : (
        <Text>There are no comments for this site.</Text>
      )}
    </Box>
  )
}

export default EmbeddedFeedbackPage
