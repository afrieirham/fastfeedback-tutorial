import Link from 'next/link'
import Head from 'next/head'
import { Button, Flex, Stack } from '@chakra-ui/react'

import { useAuth } from '@/lib/auth'
import { GithubIcon, GoogleIcon, LogoIcon } from '@/styles/icons'

export default function Home() {
  const auth = useAuth()
  return (
    <div>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                window.location.href = "/dashboard"
              }
            `,
          }}
        />
        <title>Fast Feedback</title>
      </Head>
      <Flex as='main' direction='column' align='center' justify='center' h='100vh'>
        <LogoIcon boxSize='64px' />

        {auth?.user ? (
          <Link href='/dashboard'>
            <Button
              mt={4}
              backgroundColor='white'
              variant='outline'
              color='gray.900'
              fontWeight='semibold'
              _hover={{ bg: 'gray.200' }}
              _active={{ bg: 'gray.100', transform: 'scale(0.95)' }}
            >
              View Dashboard
            </Button>
          </Link>
        ) : (
          <Stack>
            <Button
              mt={4}
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
              mt={4}
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
          </Stack>
        )}
      </Flex>
    </div>
  )
}
