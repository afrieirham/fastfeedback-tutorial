import React from 'react'
import NextLink from 'next/link'
import { Flex, Stack, Link, Avatar, Button } from '@chakra-ui/react'

import { LogoIcon } from '@/styles/icons'
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
          <NextLink href='/'>
            <LogoIcon boxSize='24px' />
          </NextLink>
          <NextLink href='/dashboard' passHref>
            <Link>Sites</Link>
          </NextLink>
          <NextLink href='/feedback' passHref>
            <Link>Feedback</Link>
          </NextLink>
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
