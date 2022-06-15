import React from "react";
import { useQueryClient, useMutation } from "react-query";
import { deleteEntry } from "../api/entriesApi";
import { Box, Button, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";

const DeleteEntryForm = ({ _id , token}) => {
  const queryClient = useQueryClient();
  const { isLoading, isSuccess, mutate, isError } = useMutation(
    async (deletionData) => {
      // deletionData comes from input to mutate function
      const response = await deleteEntry(deletionData);
      return response;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries();
        console.log(data);
      },
      onError:  (error) => {
        console.log(error);
      },
    }
  );

  const handleDelete = () => {
    mutate({_id, token});
    // id of deleted entry and token passed to deleteEntry api function as object to unpack in api
  };

  // const { isLoading, isSuccess, mutate, isError } = useMutation(
  //   async (_id) => {
  //     const response = await deleteEntry(_id);
  //     return response.data;
  //   },
  //   {
  //     onSuccess: (data) => {
  //       queryClient.invalidateQueries();
  //       console.log(data);
  //     },
  //     onError: (error) => {
  //       console.log(error);
  //     },
  //   }
  // );


  

  // deleteEntry, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries();
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   }
  // });

  // const { isLoading, isSuccess, mutate, isError, data } = useMutation(deleteEntry, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries();
  //     console.log(data);
  //   },
  //   onError: (error) => {
  //     console.log(error);
     
  //   }
  // });

  // const { isLoading, isSuccess, mutate, isError } = useMutation(() => { deleteEntry(_id)}, {
  //   onSuccess: () => {
  //     console.log('success');
  //     queryClient.invalidateQueries();
  //   },
  //   onError: (error) => {
  //     console.log("got an error");
  //   }
  // });

  // const mutation = useMutation(
  //   () => {
  //     return deleteEntry(_id)
  //   },
  //   {
  //     onSuccess: () => {
  //       console.log('success')
  //     },
  //     onError: () => {
  //       console.log('error')
  //     }
  //   }
  // )

  // https://stackoverflow.com/questions/64787093/react-query-mutation-getting-the-response-from-the-server-with-onerror-callback

  // https://stackoverflow.com/questions/67097382/how-to-use-the-response-of-usemutation-in-react-query-to-display-data

  if (isLoading) {
    return <Box>hoooold on...</Box>;
  }

  if (isSuccess) {
    return (
      <Box p={3} textAlign="center">
        <Text pb={6} fontSize="xl">
          Entry has been deleted successfully!
        </Text>
      </Box>
    );
  }

  if (isError) {
    return       <Box p={3} textAlign="center">
    <Text pb={6} fontSize="xl">
      Network Error - Please try again
    </Text>
  </Box>
  }

  return (
    <>
    
      <Box p={4}>
        <Flex direction={"column"}>
          {/* <Heading pb={6} as="h4" size="md">
            Delete Entry
          </Heading> */}
          <Text pb={6} fontSize="lg">
            Are you sure? You cannot undo this action once completed.
          </Text>
          <Button
            variant="solid"
            colorScheme={"red"}
            width={"40%"}
            alignSelf="flex-end"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default DeleteEntryForm;
