import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading } from '@chakra-ui/react'

function FeedbackTableHeader() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color='gray.700' fontSize='sm'>
            Feedback
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent='space-between' alignItems='flex-end' mb={4}>
        <Heading>My Feedback</Heading>
      </Flex>
    </>
  )
}

export default FeedbackTableHeader
