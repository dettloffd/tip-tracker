import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
    
  } from '@chakra-ui/react'

export const ModalContainer = (props) => {
    const handleClose = () => {
        props.toggleMutationState();
      };
    return (
      <>
  
        <Modal isOpen={props.isOpen} onClose={handleClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{props.title}</ModalHeader>
            <ModalCloseButton onClick={handleClose} />
            <ModalBody>
              {props.modalContent}
              {/* <Button colorScheme='blue' mr={3} onClick={handleClose}>
                Close
              </Button> */}
            </ModalBody>
  
            {/* <ModalFooter>

              <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter> */}
          </ModalContent>
        </Modal>
      </>
    )
  }