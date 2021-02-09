import React from 'react'
import NextLink from 'next/link'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading } from '@chakra-ui/react'

function SiteHeader({ site, route }) {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <NextLink href='/sites' passHref>
            <BreadcrumbLink color='gray.700' fontSize='sm'>
              Sites
            </BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        {Boolean(!route) ? (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color='gray.700' fontSize='sm'>
              {site?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem>
            <NextLink href={`/sites/${site?.id}`} passHref>
              <BreadcrumbLink color='gray.700' fontSize='sm'>
                {site?.name}
              </BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        )}
        {route && (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color='gray.700' fontSize='sm'>
              {route}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>
      <Heading>{site?.name}</Heading>
    </>
  )
}

export default SiteHeader
