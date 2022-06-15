import { useDisclosure } from "@chakra-ui/react";
import { useState, useCallback, useEffect } from "react";
import useToggleStateHook from "./useToggleStateHook";

export const useModalHook = () => {
    
    const [errorAlert, toggleErrorAlert] = useToggleStateHook(false);
    const [returnedError, setReturnedError] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();






    return {onClose, errorAlert, toggleErrorAlert, returnedError, setReturnedError};
}