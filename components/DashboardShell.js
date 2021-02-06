import React from 'react'
import NextLink from 'next/link'
import { Flex, Stack, Link, Avatar } from '@chakra-ui/react'

import { LogoIcon } from '@/styles/icons'
import { useAuth } from '@/lib/auth'

const DashboardShell = ({ children }) => {
  const { user } = useAuth()
  return (
    <Flex justifyContent='flex-start' flexDirection='column'>
      <Flex
        justifyContent='space-between'
        backgroundColor='white'
        alignItems='center'
        py={4}
        px={8}
        mx='auto'
        maxWidth='1200px'
        width='full'
      >
        <Stack spacing={4} isInline justifyContent='center' alignItems='center'>
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
        <Stack spacing={8} isInline justifyContent='center' alignItems='center'>
          {user && (
            <NextLink href='/account' passHref>
              <Link>Account</Link>
            </NextLink>
          )}
          <Avatar size='sm' src={user?.photoUrl} />
        </Stack>
      </Flex>
      <Flex backgroundColor='#edf2f7' p={8} height='100vh'>
        <Flex w='100%' maxWidth='800px' ml='auto' mr='auto' direction='column'>
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DashboardShell
