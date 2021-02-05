import { useState } from 'react'
import { Box, Button } from '@chakra-ui/react'

import DashboardShell from '@/components/DashboardShell'
import { useAuth } from '@/lib/auth'
import { createCheckoutSession, goToBillingPortal } from '@/lib/db'

function Account() {
  const { user } = useAuth()
  const [isCheckoutLoading, setCheckoutLoading] = useState(false)
  const [isBillingLoading, setBillingLoading] = useState(false)

  const handleCheckout = () => {
    setCheckoutLoading(true)
    createCheckoutSession(user.uid)
  }

  const handleBilling = () => {
    setBillingLoading(true)
    goToBillingPortal()
  }

  return (
    <DashboardShell>
      <Box>
        <Button
          onClick={handleCheckout}
          backgroundColor='gray.900'
          color='white'
          fontWeight='semibold'
          _hover={{ bg: 'gray.700' }}
          _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
          isLoading={isCheckoutLoading}
        >
          Upgrade to Starter
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
      </Box>
    </DashboardShell>
  )
}

export default Account
