import React from 'react'
import NextLink from 'next/link'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  Skeleton,
  Textarea,
} from '@chakra-ui/react'

function SiteFeedbackSkeleton() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <NextLink href='/sites' passHref>
            <BreadcrumbLink color='gray.700' fontSize='sm'>
              <Skeleton height='10px' width='40px' />
            </BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink color='gray.700' fontSize='sm'>
            <Skeleton height='10px' width='40px' />
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex justifyContent='space-between' alignItems='flex-end' my={4}>
        <Skeleton>
          <Heading>Site Name</Heading>
        </Skeleton>
      </Flex>
      <Box>
        <Textarea isDisabled placeholder='Leave a comment' backgroundColor='white' />
        <Button
          mt={2}
          type='submit'
          backgroundColor='gray.900'
          color='white'
          fontWeight='semibold'
          isDisabled
        >
          Leave Feedback
        </Button>
      </Box>
    </>
  )
}

export default SiteFeedbackSkeleton
