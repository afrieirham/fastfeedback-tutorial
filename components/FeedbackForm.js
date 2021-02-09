import React, { useState } from 'react'
import { Button, FormControl, Textarea, useToast } from '@chakra-ui/react'

import { createFeedback } from '@/lib/db'

function FeedbackForm({ siteId, route, user }) {
  const toast = useToast()
  const [comment, setComment] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setComment('')

    const newFeedback = {
      siteId,
      route: route ?? 'home',
      author: user.name,
      authorId: user.uid,
      text: comment,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'pending',
    }

    createFeedback(newFeedback)
    toast({
      title: 'Thank you for your feedback!',
      description: "Your feedback will appear once it's approved.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <FormControl as='form' id='comment' my={8} onSubmit={onSubmit}>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder='Leave a comment'
        backgroundColor='white'
      />
      <Button
        mt={2}
        type='submit'
        backgroundColor='gray.900'
        color='white'
        fontWeight='semibold'
        _hover={{ bg: 'gray.700' }}
        _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
      >
        Leave Feedback
      </Button>
    </FormControl>
  )
}

export default FeedbackForm
