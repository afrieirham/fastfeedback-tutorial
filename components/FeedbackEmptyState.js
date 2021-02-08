import React from 'react'
import { Heading, Text, Flex } from '@chakra-ui/react'

function FeedbackEmptyState() {
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
        There isn't any feedback.
      </Heading>
      <Text mb={4}>Share your site!</Text>
    </Flex>
  )
}

export default FeedbackEmptyState
