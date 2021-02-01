import React from 'react'
import { Flex, Stack, Link, Avatar, Button } from '@chakra-ui/react'

import { LogoIcon } from '@/styles/icons/logo'
import { useAuth } from '@/lib/auth'

const DashboardShell = ({ children }) => {
  const auth = useAuth()
  return (
    <Flex justifyContent='flex-start' flexDirection='column'>
      <Flex
        justifyContent='space-between'
        backgroundColor='white'
        alignItems='center'
        py={4}
        px={8}
      >
        <Stack spacing={2} isInline justifyContent='center' alignItems='center'>
          <LogoIcon boxSize='24px' />
          <Link>Feedback</Link>
          <Link>Sites</Link>
        </Stack>
        <Stack spacing={2} isInline justifyContent='center' alignItems='center'>
          {auth.user && (
            <Button variant='ghost' mr={4} onClick={() => auth.signOut()}>
              Log Out
            </Button>
          )}
          <Avatar size='sm' src={auth.user?.photoUrl} />
        </Stack>
      </Flex>
      <Flex backgroundColor='gray.50' p={8} height='100vh'>
        <Flex w='100%' maxWidth='800px' ml='auto' mr='auto' direction='column'>
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DashboardShell
