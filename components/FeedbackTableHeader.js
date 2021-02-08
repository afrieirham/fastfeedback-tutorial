import React from 'react'
import NextLink from 'next/link'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading } from '@chakra-ui/react'

function FeedbackTableHeader({ site }) {
  return (
    <>
      {site ? (
        <Breadcrumb>
          <BreadcrumbItem>
            <NextLink href='/feedback' passHref>
              <BreadcrumbLink color='gray.700' fontSize='sm'>
                Feedback
              </BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color='gray.700' fontSize='sm'>
              {site.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      ) : (
        <Breadcrumb>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color='gray.700' fontSize='sm'>
              Feedback
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      )}
      <Flex justifyContent='space-between' alignItems='flex-end' mb={4}>
        <Heading>{site?.name ?? 'All Feedback'}</Heading>
      </Flex>
    </>
  )
}

export default FeedbackTableHeader
