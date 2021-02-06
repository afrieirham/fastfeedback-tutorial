import React, { useState } from 'react'
import { Heading, Text, Button, Flex } from '@chakra-ui/react'

import { createCheckoutSession } from '@/lib/db'
import { useAuth } from '@/lib/auth'

function FreePlanEmptyState() {
  const { user } = useAuth()
  const [isCheckoutLoading, setCheckoutLoading] = useState(false)

  const handleCheckout = () => {
    setCheckoutLoading(true)
    createCheckoutSession(user.uid)
  }
  return (
    <Flex
      width='100%'
      backgroundColor='white'
      borderRadius='8px'
      p={16}
      justify='center'
      direction='column'
      align='center'
      boxShadow='lg'
    >
      <Heading as='h2' size='lg' mb={2}>
        Get feedback on your site instantly.
      </Heading>
      <Text mb={4}>Start today, then grow with us 🌱</Text>
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
    </Flex>
  )
}

export default FreePlanEmptyState
