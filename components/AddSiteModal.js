import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'

import { createSite } from '@/lib/db'
import { useAuth } from '@/lib/auth'

function AddSiteModal({ children }) {
  const initialRef = useRef()
  const toast = useToast()
  const { user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleSubmit, register } = useForm()

  const onSubmit = async ({ name, url }) => {
    const newSite = {
      authorId: user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
    }

    // Add site to db
    const { id } = await createSite(newSite)

    // Update local sites data
    mutate(
      ['/api/sites', user.token],
      async ({ sites }) => ({ sites: [{ id, ...newSite }, ...sites] }),
      false,
    )

    toast({
      title: 'Success!',
      description: "We've created your site.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
    onClose()
  }

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor='gray.900'
        color='white'
        fontWeight='semibold'
        _hover={{ bg: 'gray.700' }}
        _active={{ bg: 'gray.800', transform: 'scale(0.95)' }}
      >
        {children}
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as='form' onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name='name'
                ref={initialRef}
                ref={register({ required: 'Site name is required' })}
                placeholder='My Site'
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                name='url'
                ref={register({ required: 'Site link is required' })}
                placeholder='https://website.com'
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button backgroundColor='#99FFFE' color='#194D4C' type='submit'>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddSiteModal
