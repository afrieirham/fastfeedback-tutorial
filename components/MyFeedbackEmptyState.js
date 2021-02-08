import React from 'react'
import { Heading, Text, Flex } from '@chakra-ui/react'

function MyFeedbackEmptyState() {
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
        You haven't left any feedback.
      </Heading>
      <Text mb={4}>Spread the love!</Text>
    </Flex>
  )
}

export default MyFeedbackEmptyState
