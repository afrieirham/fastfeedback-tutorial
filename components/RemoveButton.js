import React, { useRef, useState } from 'react'
import { mutate } from 'swr'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  IconButton,
  Button,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

import { deleteFeedback } from '@/lib/db'
import { useAuth } from '@/lib/auth'

function RemoveButton({ feedbackId }) {
  const [isOpen, setIsOpen] = useState(false)
  const cancelRef = useRef()
  const { user } = useAuth()

  const onClose = () => setIsOpen(false)
  const onDelete = () => {
    deleteFeedback(feedbackId)
    mutate(
      ['/api/feedback', user.token],
      async ({ feedback: allFeedback }) => ({
        feedback: allFeedback?.filter((feedback) => feedback.id !== feedbackId),
      }),
      false,
    )
    onClose()
  }

  return (
    <>
      <IconButton
        aria-label='Delete feedback'
        variant='ghost'
        icon={<DeleteIcon />}
        onClick={() => setIsOpen(true)}
      />

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Feedback
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default RemoveButton
