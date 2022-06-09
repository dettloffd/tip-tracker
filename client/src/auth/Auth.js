import React, { useState, useContext } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
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
  Input,
  Text,
  useQuery,
} from "@chakra-ui/react";
import { useQueryClient, useMutation } from "react-query";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const auth = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { mutate , isError } = useMutation(authSubmitHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const onAuthSubmit = (values, { resetForm }) => {
    const userData = {
      email: values.email,
      password: values.password,
      username: values.username

    };
    mutate({userData: userData, isLoginMode: isLoginMode})
    auth.login();
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

  if (isError){

    return (<>
    <Container>
      <h1>Error has occurred. Please reload and try again.</h1>
    </Container>
    </>)
  }

  return (
    <>
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
                      {!meta.error  ? <FormHelperText>{inputField.helper}</FormHelperText> : <FormHelperText color={'red.300'}>{meta.error}</FormHelperText>  }

                      
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
                <Text fontSize={[ "sm", "sm", "md"]}>{isLoginMode ? 'Log In' : 'Sign up'}</Text>
                
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
