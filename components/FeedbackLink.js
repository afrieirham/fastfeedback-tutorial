import { Flex, Link } from '@chakra-ui/react'

function FeedbackLink({ siteId }) {
  return (
    <Flex justifyContent='space-between' mb={8} width='full' mt={1}>
      <Link fontSize='sm' fontWeight='bold' href={`/p/${siteId}`}>
        Leave a comment →
      </Link>
      <Link fontSize='xs' color='blackAlpha.500' href='/'>
        Powered by Fast Feedback
      </Link>
    </Flex>
  )
}

export default FeedbackLink
