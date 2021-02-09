import React from 'react'
import NextLink from 'next/link'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Heading } from '@chakra-ui/react'

import EditSiteSettingModal from './EditSiteSettingModal'

function SiteHeader({ isOwner, site, route }) {
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
      <Flex justifyContent='space-between' alignItems='flex-end' mt={4}>
        <Heading>{site?.name}</Heading>
        {isOwner && (
          <EditSiteSettingModal siteId={site?.id} siteSettings={site?.settings}>
            Edit Site
          </EditSiteSettingModal>
        )}
      </Flex>
    </>
  )
}

export default SiteHeader
