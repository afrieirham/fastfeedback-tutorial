import { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'

import Feedback from '@/components/Feedback'
import { useAuth } from '@/lib/auth'
import { getAllFeedback, getAllSites } from '@/lib/db-admin'
import { createFeedback } from '@/lib/db'

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
  const auth = useAuth()
  const router = useRouter()
  const [comment, setComment] = useState('')
  const [allFeedback, setAllFeedback] = useState(initialFeedback)

  const onSubmit = (e) => {
    e.preventDefault()

    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: comment,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending',
    }

    createFeedback(newFeedback)
    setComment('')
    setAllFeedback([newFeedback, ...allFeedback])
  }

  return (
    <Box display='flex' flexDirection='column' width='full' maxWidth='700px' mx='auto'>
      <FormControl as='form' id='comment' my={8} onSubmit={onSubmit}>
        <FormLabel>Comment</FormLabel>
        <Input
          type='text'
          name='comment'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button mt={2} type='submit'>
          Add Comment
        </Button>
      </FormControl>
      {allFeedback.map((feedback) => (
        <Feedback key={feedback.id} {...feedback} />
      ))}
    </Box>
  )
}

export default SiteFeedback
