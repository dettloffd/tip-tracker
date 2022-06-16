import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Formik, Form, Field } from "formik";
import { userValidationSchemas } from "./userValidationSchema";
import { authInputTextFields } from "./authInputTextFields";
import { authSubmitHandler } from "./api/authApi";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Flex,
  Icon,
  Input,
  Text,
  useQuery,
} from "@chakra-ui/react";
import { useQueryClient, useMutation } from "react-query";
import { useModalHook } from "../hooks/useModalHook";
import { MdClose } from "react-icons/md";
import { ModalContainer } from "../UIElements/ModalContainer";
import SyncLoader from "react-spinners/SyncLoader";


const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const auth = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    onClose,
    errorAlert,
    toggleErrorAlert,
    returnedError,
    setReturnedError,
  } = useModalHook();

  const { isLoading, mutate} = useMutation(
    async (authData) => {
      const response = await authSubmitHandler(authData);
      if (isLoginMode){
        auth.login(response.data.existingUser._id, response.data.token);
      } else{
        auth.login(response.data.createdUser._id, response.data.token);
      }
      return response;
      // response is being returned to the onSuccess and onError functions below
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries();
      },
      onError: (error) => {
        setReturnedError(error.response.data.message);
        toggleErrorAlert();
      },
    }
  );

  const onAuthSubmit = (values, { resetForm }) => {
    const userData = {
      email: values.email,
      password: values.password,
      username: values.username,
    };
    mutate({ userData: userData, isLoginMode: isLoginMode });
    resetForm();
  };

  const switchModeHandler = () => {
    setIsLoginMode((currentMode) => !currentMode);
  };

  const initialFormState = {
    username: "",
    email: "",
    password: "",
  };

  if (isLoading) {
    return (
      <Flex width="100%" alignItems={"center"} justify={"center"} p={6}>
        <SyncLoader size={25} color={"#4FD1C5"} loading={true} />
      </Flex>
    );
  }

  return (
    <>
      {errorAlert && (
        <ModalContainer
          isOpen={errorAlert}
          setReturnedError={setReturnedError}
          modalContent={
            <Box p={3} textAlign="center">
              <Flex alignItems={"center"} justifyContent={"center"} pb={5}>
                <Icon
                  w={12}
                  h={12}
                  paddingRight={3}
                  as={MdClose}
                  color="red.500"
                />
                <Text fontSize="lg">{returnedError}</Text>
              </Flex>
            </Box>
          }
          onClose={onClose}
          toggleOpenState={toggleErrorAlert}
          title={"Error"}
        />
      )}

      <Container
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
          validationSchema={
            userValidationSchemas[
              isLoginMode
                ? "userLoginValidationSchema"
                : "userSignupValidationSchema"
            ]
          }
          onSubmit={onAuthSubmit}
        >
          {(props) => (
            <Form>
              {authInputTextFields[
                isLoginMode ? "authLogin" : "authSignup"
              ].map((inputField) => (
                <Field
                  name={inputField.id}
                  id={inputField.id}
                  type={inputField.type}
                  label={inputField.label}
                >
                  {({ field, form, meta }) => (
                    <FormControl id={inputField.id}>
                      <FormLabel htmlFor={inputField.id}>
                        {inputField.label}
                      </FormLabel>
                      <Input
                        {...field}
                        type={inputField.type}
                        isInvalid={meta.touched && meta.error}
                      ></Input>
                      {/* <FormHelperText>{inputField.errortext}</FormHelperText> */}
                      {/* {!meta.error  ? <FormHelperText>{inputField.helper}</FormHelperText> : <FormHelperText>{inputField.errortext}</FormHelperText>  } */}
                      {!meta.error ? (
                        <FormHelperText>{inputField.helper}</FormHelperText>
                      ) : (
                        <FormHelperText color={"red.300"}>
                          {meta.error}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                </Field>
              ))}

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
                <Text fontSize={["sm", "sm", "md"]}>
                  {isLoginMode ? "Log In" : "Sign up"}
                </Text>
              </Button>
            </Form>
          )}
        </Formik>
        <Button onClick={switchModeHandler}>
          {isLoginMode ? "LoginMode" : "!LoginMode"}
        </Button>
      </Container>
    </>
  );
};

export default Auth;
