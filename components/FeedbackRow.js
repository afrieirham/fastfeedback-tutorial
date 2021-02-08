import React from 'react'
import { mutate } from 'swr'
import { Box, Code, Switch } from '@chakra-ui/react'

import { Td } from './Table'
import RemoveButton from './RemoveButton'
import { useAuth } from '@/lib/auth'
import { updateFeedback } from '@/lib/db'

const FeedbackTable = ({ id, author, text, status }) => {
  const { user } = useAuth()

  const toggleFeedback = (e) => {
    const newStatus = e.target.checked ? 'active' : 'pending'

    const mutateFeedback = ({ feedback: allFeedback }) => {
      return {
        feedback: allFeedback.map((feedback) => {
          if (feedback.id === id) {
            return {
              ...feedback,
              status: newStatus,
            }
          }
          return feedback
        }),
      }
    }

    updateFeedback(id, { status: newStatus })
    mutate(['/api/feedback', user.token], mutateFeedback, false)
  }

  return (
    <Box as='tr'>
      <Td fontWeight='semibold'>{author}</Td>
      <Td>{text}</Td>
      <Td>
        <Code>/</Code>
      </Td>
      <Td>
        <Switch onChange={toggleFeedback} colorScheme='green' isChecked={status === 'active'} />
      </Td>
      <Td>
        <RemoveButton feedbackId={id} />
      </Td>
    </Box>
  )
}

export default FeedbackTable
