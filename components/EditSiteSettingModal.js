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
  Button,
  useDisclosure,
  useToast,
  Switch,
} from '@chakra-ui/react'

import { updateSite } from '@/lib/db'
import { useAuth } from '@/lib/auth'

function EditSiteSettingModal({ siteId, siteSettings, children }) {
  const initialRef = useRef()
  const toast = useToast()
  const { user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleSubmit, register } = useForm()

  const onSubmit = async (settings) => {
    // Update site to db
    await updateSite(siteId, { settings })

    // Update local sites data
    mutate(['/api/sites', user.token], true)

    toast({
      title: 'Success!',
      description: "We've updated your site settings.",
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
          <ModalHeader>Edit Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4} display='flex' alignItems='center'>
              <Switch
                id='icons'
                name='icons'
                colorScheme='green'
                ref={register}
                defaultChecked={siteSettings?.icons}
              />
              <FormLabel htmlFor='icons' ml='2' mb='0'>
                Show icons
              </FormLabel>
            </FormControl>
            <FormControl mt={4} display='flex' alignItems='center'>
              <Switch
                id='timestamps'
                name='timestamps'
                colorScheme='green'
                ref={register}
                defaultChecked={siteSettings?.timestamps}
              />
              <FormLabel htmlFor='timestamps' ml='2' mb='0'>
                Show timestamps
              </FormLabel>
            </FormControl>
            <FormControl mt={4} display='flex' alignItems='center'>
              <Switch
                id='ratings'
                name='ratings'
                colorScheme='green'
                ref={register}
                defaultChecked={siteSettings?.ratings}
              />
              <FormLabel htmlFor='ratings' ml='2' mb='0'>
                Show ratings
              </FormLabel>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button backgroundColor='#99FFFE' color='#194D4C' type='submit'>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditSiteSettingModal
