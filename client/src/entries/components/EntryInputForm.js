import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  FormHelperText,
  useToast,
  Toast,
} from "@chakra-ui/react";

import { AuthContext } from "../../auth/AuthContext";

import { useQueryClient } from "react-query";
import { useMutation } from "react-query";

import entryValidationSchema from "../../util/entryValidationSchema";
import { addEntry } from "../api/entriesApi";
import { format, parseISO } from "date-fns";

const EntryInputForm = (props) => {
  const { userId, token } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const toast = useToast();

  const { isLoading, mutate, isError } = useMutation(
    async (newEntryData) => {
      const response = await addEntry(newEntryData);
      return response;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries();
        let d = new Date(data.data.entry.date);
        let formattedDate = ( format((new Date( d.getTime() + Math.abs(d.getTimezoneOffset()*60000) )), "EEEE, yyyy-MM-dd"));
        // Since I store date as zeroed ("2022-06-15T00:00:00.000Z"), timezone offset is showing previous day without this
        // https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off

        toast({
          title: 'New entry',
          description: `New entry has been created for ${formattedDate} ! `,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom'
        });
      },
      onError: (error) => {
        // console.log(error);
      },
    }
  );

  const initialFormState = {
    date: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
    tipsTotal: 0,
    numTransactions: 0,
  };

  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    const newEntry = {
      tipsTotal: values.tipsTotal,
      date: values.date,
      numTransactions: values.numTransactions,
      //creator: userId,
      // creator no longer necessary - userId extracted/set in check-auth

    };
    mutate({newEntry, token});
    resetForm();
  };

  if (isError) {
    console.log("error...");
  }

  

  return (
    <>
      <Box
        bg="white"
        p={6}
        borderRadius="lg"
        width={"100%"}
        textAlign="center"
        boxShadow={"lg"}
      >
        <Formik
          enableReinitialize
          initialValues={initialFormState}
          validationSchema={entryValidationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <Flex direction="column">
                <Field id="date" label="date" type="date" name="date">
                  {({ field, form, meta }) => (
                    <FormControl pb={3}>
                      <Input
                        {...field}
                        isInvalid={meta.touched && meta.error}
                        type="date"
                      ></Input>
                    </FormControl>
                  )}
                </Field>

                <Field name="tipsTotal">
                  {({ field, form, meta }) => (
                    <FormControl id="tipsTotal" pb={3}>
                      <FormLabel
                        fontSize={["sm", "sm", "md", "md", "md"]}
                        htmlFor="tipsTotal"
                      >
                        Total Tips Received
                      </FormLabel>
                      <NumberInput
                        min={0}
                        id="tipsTotal"
                        {...field}
                        onChange={(val) => form.setFieldValue(field.name, val)}
                        isInvalid={meta && meta.touched && meta.error}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>

                      <FormHelperText fontSize={["sm", "sm", "md", "md", "md"]}>
                        Enter the value of all tips received for this shift.
                      </FormHelperText>

                    </FormControl>
                  )}
                </Field>

                <Field name="numTransactions">
                  {({ field, form, meta }) => (
                    <FormControl id="numTransactions">
                      <FormLabel
                        fontSize={["sm", "sm", "md", "md", "md"]}
                        htmlFor="numTransactions"
                      >
                        Total Transactions
                      </FormLabel>
                      <NumberInput
                        min={1}
                        id="numTransactions"
                        {...field}
                        onChange={(val) => form.setFieldValue(field.name, val)}
                        isInvalid={meta.touched && meta.error}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <FormHelperText fontSize={["sm", "sm", "md", "md", "md"]}>
                        Enter the total number of transactions for this shift.
                      </FormHelperText>
                    </FormControl>
                  )}
                </Field>

                <Button
                  isDisabled={!props.isValid}
                  colorScheme="teal"
                  size="md"
                  type="submit"
                  variant="solid"
                  color="white"
                  // width="50%"
                  alignSelf="center"
                  mt={4}
                >
                  <Text fontSize={["sm", "sm", "md"]}>Submit Entry</Text>
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default EntryInputForm;
