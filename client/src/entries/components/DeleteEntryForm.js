import React from "react";
import { useQueryClient, useMutation } from "react-query";
import { deleteEntry } from "../api/entriesApi";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

const DeleteEntryForm = ({_id}) => {
  const queryClient = useQueryClient();

  const { isLoading, isSuccess, mutate } = useMutation(deleteEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries("userEntries");
    },
  });

  const handleDelete = () => {
    mutate(_id);
  };

    if (isLoading) {
    return <Box >hoooold on...</Box>;
  }

  if (isSuccess) {
    return (
        <Box p={3} textAlign="center">
        <Text pb={6} fontSize='xl'>Entry deleted!</Text>
    </Box>
    );
  }

  return (
    <>
      <Box p={4}>
          <Flex direction={"column"}>
          <Heading pb={6} as="h4" size='md'>Delete Entry</Heading>
          <Text pb={6} fontSize='lg'>Are you sure? You cannot undo this action once completed.</Text>
        <Button variant="solid" colorScheme={"red"} width={"40%"} alignSelf="flex-end" onClick={handleDelete}>
          Delete
        </Button>
        </Flex>
      </Box>
    </>
  );
};

export default DeleteEntryForm;
