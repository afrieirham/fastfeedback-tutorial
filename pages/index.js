import Link from 'next/link'
import Head from 'next/head'
import { Button, Flex } from '@chakra-ui/react'

import { useAuth } from '@/lib/auth'
import { LogoIcon } from '@/styles/icons/logo'

export default function Home() {
  const auth = useAuth()
  return (
    <div>
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <Flex as='main' direction='column' align='center' justify='center' h='100vh'>
        <LogoIcon boxSize='64px' />

        {auth?.user ? (
          <Link href='/dashboard'>
            <Button mt={4}>View Dashboard</Button>
          </Link>
        ) : (
          <Button mt={4} onClick={() => auth.signInWithGithub()}>
            Sign In
          </Button>
        )}
      </Flex>
    </div>
  )
}
