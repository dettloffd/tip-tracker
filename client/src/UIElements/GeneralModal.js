import { React, useState } from "react";
import {
  Box,
  Button,
  Container,
  CloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function GeneralModal(props) {
  const [isOpen, setOpen] = useState(true);

  // const handleOpen = () => {
  //   setOpen(true);
  // };
  //No need currently; modal is being generated conditionally and initially set open to true

  const handleClose = () => {
    setOpen(false);
    props.toggleMutationState();
  };

  return (
    <>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={handleClose}

        // onBackdropClick={props.toggleBoi}
      >
        <ModalOverlay />
        <ModalContent>
        <ModalHeader p="2"><CloseButton onClick={handleClose}></CloseButton></ModalHeader>
        {props.modalContent}
        </ModalContent>
      </Modal>
    </>
  );
}
