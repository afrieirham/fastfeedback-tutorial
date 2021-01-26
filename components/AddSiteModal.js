import { useRef } from 'react'
import { useForm } from 'react-hook-form'
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
} from '@chakra-ui/react'
import { createSite } from '@/lib/db'

function AddSiteModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef()
  const { handleSubmit, register } = useForm()

  const onSubmit = (data) => {
    createSite(data)
  }

  return (
    <>
      <Button variant='solid' size='md' maxWidth='200px' onClick={onOpen}>
        Add Your First Site
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
