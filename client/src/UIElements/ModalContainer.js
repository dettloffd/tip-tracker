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
    // const { isOpen, onOpen, onClose } = useDisclosure()
    // console.log(props);
    const handleClose = () => {
        // props.isOpen(false);
        props.onClose();
        props.toggleMutationState();
      };
    return (
      <>
  
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
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