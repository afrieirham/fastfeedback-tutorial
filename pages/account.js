import React, { useState } from 'react'
import {
  Flex,
  Avatar,
  Text,
  Badge,
  Button,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react'

import DashboardShell from '@/components/DashboardShell'
import { useAuth } from '@/lib/auth'
import { goToBillingPortal } from '@/lib/db'

function Account() {
  const { user, signOut } = useAuth()
  const [isBillingLoading, setBillingLoading] = useState(false)

  const handleBilling = () => {
    setBillingLoading(true)
    goToBillingPortal()
  }

  return (
    <DashboardShell>
      <Flex justifyContent='center' mt={8}>
        <Flex
          flexDirection='column'
          justifyContent='flex-start'
          alignItems='center'
          maxWidth='600px'
          width='full'
        >
          <Avatar size='xl' src={user?.photoUrl} />
          <Text fontSize='4xl' fontWeight='bold' mt={4}>
            {user?.name}
          </Text>
          <Text>{user?.email}</Text>
          <Flex flexDirection='column' width='full' backgroundColor='white' boxShadow='md' mt={8}>
            <Flex
              justifyContent='space-between'
              alignItems='center'
              backgroundColor='gray.50'
              borderBottom='1px solid'
              borderBottomColor='gray.200'
              p={4}
            >
              <Text textTransform='uppercase' fontSize='xs' color='gray.500' fontWeight='semibold'>
                Settings
              </Text>
              <Badge height='1rem' colorScheme='blue'>
                {user?.stripeRole ?? 'Free'}
              </Badge>
            </Flex>
            <Stack spacing={8} p={4}>
              <Flex justifyContent='flex-start'>
                <Stat>
                  <StatLabel fontWeight='semibold' color='gray.700'>
                    Feedback
                  </StatLabel>
                  <StatNumber fontWeight='semibold'>∞</StatNumber>
                  <StatHelpText>10,000 limit</StatHelpText>
                </Stat>
                <Stat>
                  <StatLabel fontWeight='semibold' color='gray.700'>
                    Sites
                  </StatLabel>
                  <StatNumber fontWeight='semibold'>1/∞</StatNumber>
                  <StatHelpText>Unlimited Sites</StatHelpText>
                </Stat>
              </Flex>
              <Flex>
                <Text>
                  Fast Feedback uses Stripe to update, change, or cancel your subscription. You can
                  also update card information and billing addresses through the secure portal.
                </Text>
              </Flex>
              <Stack spacing={2} isInline justifyContent='flex-end'>
                <Button variant='ghost' ml={4} onClick={() => signOut()}>
                  Log Out
                </Button>
                <Button
                  ml={4}
                  onClick={handleBilling}
                  backgroundColor='gray.900'
                  color='white'
                  fontWeight='semibold'
                  _hover={{ bg: 'gray.700' }}
                  _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
                  isLoading={isBillingLoading}
                >
                  Manage Billing
                </Button>
              </Stack>
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </DashboardShell>
  )
}

export default Account
