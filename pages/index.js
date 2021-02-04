import React, { useState } from 'react'
import Head from 'next/head'
import { Flex, Text, Stack, Button, Box, Link } from '@chakra-ui/react'

import Feedback from '@/components/Feedback'
import FeedbackLink from '@/components/FeedbackLink'
import { useAuth } from '@/lib/auth'
import { getAllFeedback } from '@/lib/db-admin'
import { GithubIcon, GoogleIcon, LogoIcon } from '@/styles/icons'

const SITE_ID = 'WXiuWrVI69rKuMh1scyZ'

export async function getStaticProps() {
  const { feedback } = await getAllFeedback(SITE_ID)
  return {
    props: {
      initialFeedback: feedback,
    },
    revalidate: 1,
  }
}

function Home({ initialFeedback }) {
  const auth = useAuth()
  const [allFeedback] = useState(initialFeedback)

  return (
    <div>
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <Flex flexDirection='column'>
        <Box backgroundColor='#edf2f7'>
          <Flex flexDirection='column' maxWidth='700px' ml='auto' mr='auto' pt={16} pb={16}>
            <LogoIcon boxSize='48px' />
            <Text mt={8} mb={8} fontSize='lg'>
              <Text as='span' display='inline' fontWeight='bold'>
                Fast Feedback
              </Text>{' '}
              is being built as part of{' '}
              <Link href='https://react2025.com' isExternal textDecoration='underline'>
                React 2025
              </Link>
              . It's the easiest way to add comments or reviews to your static site. Try it out by
              leaving a comment below. After the comment is approved, it will display below.
            </Text>
            <Stack spacing={2} isInline>
              {auth.user ? (
                <Link href='/dashboard'>
                  <Button
                    backgroundColor='gray.900'
                    color='white'
                    fontWeight='semibold'
                    _hover={{ bg: 'gray.700' }}
                    _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
                  >
                    View Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Button
                    onClick={() => auth.signInWithGithub()}
                    backgroundColor='gray.900'
                    color='white'
                    fontWeight='semibold'
                    _hover={{ bg: 'gray.700' }}
                    _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
                    leftIcon={<GithubIcon />}
                  >
                    Sign In with GitHub
                  </Button>
                  <Button
                    onClick={() => auth.signInWithGoogle()}
                    backgroundColor='white'
                    variant='outline'
                    color='gray.900'
                    fontWeight='semibold'
                    _hover={{ bg: 'gray.200' }}
                    _active={{ bg: 'gray.100', transform: 'scale(0.95)' }}
                    leftIcon={<GoogleIcon />}
                  >
                    Sign In with Google
                  </Button>
                </>
              )}
            </Stack>
          </Flex>
        </Box>
        <Flex flexDirection='column' width='100%' maxWidth='700px' ml='auto' mr='auto' mt={8}>
          <FeedbackLink siteId={SITE_ID} />
          {allFeedback.map((feedback) => (
            <Feedback key={feedback.id} {...feedback} />
          ))}
        </Flex>
      </Flex>
    </div>
  )
}

export default Home
