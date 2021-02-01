import React from 'react'
import NextLink from 'next/link'
import { Box, Link } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'

import { Table, Td, Th, Tr } from './Table'

const SiteTable = ({ sites }) => (
  <Table>
    <thead>
      <Tr>
        <Th>Name</Th>
        <Th>Site Link</Th>
        <Th>Feedback Link</Th>
        <Th>Date Added</Th>
        <Th> </Th>
      </Tr>
    </thead>
    <tbody>
      {sites.map((site) => (
        <Box as='tr' key={site.url}>
          <Td fontWeight='semibold'>{site.name}</Td>
          <Td>{site.url}</Td>
          <Td>
            <NextLink href={`/p/${site.id}`} passHref>
              <Link color='blue.500' fontWeight='semibold'>
                View Feedback
              </Link>
            </NextLink>
          </Td>
          <Td>{format(parseISO(site.createdAt), 'MMM Mo yyyy')}</Td>
        </Box>
      ))}
    </tbody>
  </Table>
)

export default SiteTable
