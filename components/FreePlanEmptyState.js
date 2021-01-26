import React from 'react'
import { Heading, Text, Button, Flex } from '@chakra-ui/react'
import DashboardShell from './DashboardShell'

const FreePlanEmptyState = () => {
  return (
    <DashboardShell>
      <Flex
        width='100%'
        backgroundColor='white'
        borderRadius='8px'
        p={16}
        justify='center'
        direction='column'
        align='center'
      >
        <Heading as='h2' size='lg' mb={2}>
          Get feedback on your site instantly.
        </Heading>
        <Text mb={4}>Start today, then grow with us 🌱</Text>
        <Button variant='solid' size='md'>
          Upgrade to Starter
        </Button>
      </Flex>
    </DashboardShell>
  )
}

export default FreePlanEmptyState
