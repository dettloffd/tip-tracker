import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  FormHelperText,
} from "@chakra-ui/react";

import { useQueryClient } from "react-query";
import { useMutation } from "react-query";

import formatToday from "../../util/formatToday";
import entryValidationSchema from "../../util/entryValidationSchema";
import { addEntry } from "../api/entriesApi";
import { format, parseISO } from "date-fns";

const EntryInputForm = (props) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(addEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries("userEntries");
    },
  });

//   let todaysDate = new Date().toISOString();
//   console.log(todaysDate);
//  let notToIso = format(new Date(), "yyyy-MM-dd");
//  console.log(notToIso);
//  let possible = format(parseISO(new Date().toISOString()), "yyyy-MM-dd");
//  console.log(possible);

// test for differences

  const initialFormState = {
    // date: new Date().toISOString(),
    date: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
    // date: formatToday(),
    tipsTotal: 0,
    numTransactions: 0,
  };

  const onSubmit = (values, { resetForm }) => {
    const newEntry = {
      tipsTotal: values.tipsTotal,
      date: values.date,
      // date: values.date,
      numTransactions: values.numTransactions,
      creator: 1337,
      _id: props.__id,
    };
    mutate(newEntry);
    resetForm();
  };

  return (
    <>
      <Box bg="white" p={6} rounded="md" width={"100%"} textAlign="center">
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
                    <FormLabel htmlFor="tipsTotal">
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

                    <FormHelperText>
                      Enter the value of all tips received for this shift.
                    </FormHelperText>

                    
                    {/* <FormHelperText>Yooo</FormHelperText> */}
                  </FormControl>
                )}
              </Field>

              <Field name="numTransactions">
                {({ field, form, meta }) => (
                  <FormControl id="numTransactions">
                    <FormLabel htmlFor="numTransactions">
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
                    <FormHelperText>
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
                width="50%"
                alignSelf="center"
                mt={4}
                
              >
                Submit New Entry
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
