import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  FormControl,
  Heading,
  Textarea,
} from '@chakra-ui/react'

import Feedback from '@/components/Feedback'
import { useAuth } from '@/lib/auth'
import { getAllFeedback, getAllSites, getSite } from '@/lib/db-admin'
import { createFeedback } from '@/lib/db'
import DashboardShell from '@/components/DashboardShell'

export async function getStaticProps(context) {
  const [siteId, route] = context.params.site
  const { feedback } = await getAllFeedback(siteId, route)
  const { site } = await getSite(siteId)
  return {
    props: {
      initialFeedback: feedback,
      site,
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

function FeedbackPage({ initialFeedback, site }) {
  const auth = useAuth()
  const router = useRouter()
  const [comment, setComment] = useState('')
  const [allFeedback, setAllFeedback] = useState(initialFeedback)
  const [siteId, route] = router.query.site || []

  useEffect(() => {
    setAllFeedback(initialFeedback)
  }, [initialFeedback])

  const onSubmit = async (e) => {
    e.preventDefault()

    const newFeedback = {
      siteId,
      route: route ?? 'home',
      author: auth.user.name,
      authorId: auth.user.uid,
      text: comment,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending',
    }

    const { id } = await createFeedback(newFeedback)
    setComment('')
    setAllFeedback([{ id, ...newFeedback }, ...allFeedback])
  }

  return (
    <DashboardShell>
      <Box display='flex' flexDirection='column' width='full' maxWidth='800px' mx='auto'>
        <Breadcrumb>
          <BreadcrumbItem>
            <NextLink href='/sites' passHref>
              <BreadcrumbLink color='gray.700' fontSize='sm'>
                Sites
              </BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
          {Boolean(!route) ? (
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color='gray.700' fontSize='sm'>
                {site?.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ) : (
            <BreadcrumbItem>
              <NextLink href={`/sites/${site?.id}`} passHref>
                <BreadcrumbLink color='gray.700' fontSize='sm'>
                  {site?.name}
                </BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>
          )}
          {route && (
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color='gray.700' fontSize='sm'>
                {route}
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
        <Heading>{site?.name}</Heading>
        <FormControl as='form' id='comment' my={8} onSubmit={onSubmit}>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Leave a comment'
            backgroundColor='white'
          />
          <Button
            mt={2}
            type='submit'
            backgroundColor='gray.900'
            color='white'
            fontWeight='semibold'
            _hover={{ bg: 'gray.700' }}
            _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
          >
            Leave Feedback
          </Button>
        </FormControl>
        {allFeedback &&
          allFeedback.length &&
          allFeedback.map((feedback) => <Feedback key={feedback.id} {...feedback} />)}
      </Box>
    </DashboardShell>
  )
}

export default FeedbackPage
