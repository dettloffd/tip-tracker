import React, { useState, useContext } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
import { AuthContext } from "./AuthContext";
import { Formik, Form, Field } from "formik";
import { userValidationSchemas } from "./userValidationSchema";
import { authInputTextFields } from "./authInputTextFields";

import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const auth = useContext(AuthContext);

  const onAuthSubmit = () => {
    auth.login();
  };

  const switchModeHandler = () => {
    setIsLoginMode((currentMode) => !currentMode);
  };

  // const initialFormState = {
  //   [isLoginMode ? "username" : null]: "",
  //   email: "",
  //   password: "",
  // };

  const initialFormState = {
    username: "",
    email: "",
    password: "",
  };

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
              {/* {inputFields.map((inputField) => (
                <TextFieldWrapper
                  name={inputField.id}
                  label={inputField.label}
                  type={inputField.type}
                  className={classes.userInputFields}
                />
              ))} */}

              {/* {authInputTextFields[
                isLoginMode ? "authLogin" : "authSignup"
              ].map((inputField) => (
                <Input
                  name={inputField.id}
                  label={inputField.label}
                  type={inputField.type}
                />
              ))} */}

              {/* <Field>
                  <FormControl>
                      <FormLabel></FormLabel>
                      <Input>
                      </Input>
                      <FormHelperText></FormHelperText>
                  </FormControl>

              </Field> */}

              {/* <Field name={inputField.name}>
              {({ field, form, meta }) => (
                  <FormControl>
                      <FormLabel></FormLabel>
                      <Input name={inputField.id} label={inputField.label} type={inputField.type} isInvalid={meta.touched && meta.error}>
                      {...field}
                      </Input>
                      <FormHelperText></FormHelperText>
                  </FormControl>
                  )}
              </Field> */}

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
      {/* <Button onClick={() => setIsLoginMode((currentMode) => !currentMode)}> */}
    </>
  );
};

export default Auth;