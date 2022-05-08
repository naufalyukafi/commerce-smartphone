import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { IModalAddCart } from '../utils/types'

const ModalAddCart = ({ isOpen, isClose, children }: IModalAddCart) => {
  return (
    <Modal size='xl' isOpen={isOpen} onClose={isClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Berhasil Ditambahkan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              {children}
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
  )
}

export default ModalAddCart