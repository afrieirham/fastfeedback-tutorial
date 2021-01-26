import { useAuth } from '@/lib/auth'
import { Button, Code, Heading, Text } from '@chakra-ui/react'

export default function Home() {
  const auth = useAuth()
  return (
    <div>
      <main>
        <Heading>Fast Feedback</Heading>

        <Text>
          Current user: <Code>{auth.user ? auth.user.email : 'none'}</Code>
        </Text>

        {auth?.user ? (
          <Button onClick={() => auth.signOut()}>Sign Out</Button>
        ) : (
          <Button onClick={() => auth.signInWithGithub()}>Sign In</Button>
        )}
      </main>
    </div>
  )
}
