import React from 'react'
import { Heading, Text, Flex } from '@chakra-ui/react'

import AddSiteModal from './AddSiteModal'

const EmptyState = () => {
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
        You haven't add any sites.
      </Heading>
      <Text mb={4}>Welcome 👋🏻 Let's get started</Text>
      <AddSiteModal>Add Your First Site</AddSiteModal>
    </Flex>
  )
}

export default EmptyState
