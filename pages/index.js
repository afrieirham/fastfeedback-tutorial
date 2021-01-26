import { useAuth } from '@/lib/auth'
import { LogoIcon } from '@/styles/icons/logo'
import { Button, Flex } from '@chakra-ui/react'

export default function Home() {
  const auth = useAuth()
  return (
    <div>
      <head>
        <title>Fast Feedback</title>
      </head>
      <Flex as='main' direction='column' align='center' justify='center' h='100vh'>
        <LogoIcon boxSize='64px' />

        {auth?.user ? (
          <Button mt={4} size='sm' onClick={() => auth.signOut()}>
            Sign Out
          </Button>
        ) : (
          <Button mt={4} size='sm' onClick={() => auth.signInWithGithub()}>
            Sign In
          </Button>
        )}
      </Flex>
    </div>
  )
}
