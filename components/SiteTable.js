import React from 'react'
import NextLink from 'next/link'
import { Box, Link } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'

import { Table, Td, Th, Tr } from './Table'
import DeleteSiteButton from './DeleteSiteButton'

const SiteTable = ({ sites }) => (
  <Table>
    <thead>
      <Tr>
        <Th>Name</Th>
        <Th>Site Link</Th>
        <Th>Feedback Link</Th>
        <Th>Date Added</Th>
        <Th width='30px'> </Th>
      </Tr>
    </thead>
    <tbody>
      {sites.map((site) => (
        <Box as='tr' key={site.id}>
          <Td fontWeight='semibold'>
            <NextLink href={`/sites/${site.id}`} passHref>
              <Link>{site.name}</Link>
            </NextLink>
          </Td>
          <Td>{site.url}</Td>
          <Td>
            <NextLink href={`/feedback/${site.id}`} passHref>
              <Link color='blue.500' fontWeight='semibold'>
                View Feedback
              </Link>
            </NextLink>
          </Td>
          <Td>{format(parseISO(site.createdAt), 'MMM Mo yyyy')}</Td>
          <Td>
            <DeleteSiteButton siteId={site.id} />
          </Td>
        </Box>
      ))}
    </tbody>
  </Table>
)

export default SiteTable
