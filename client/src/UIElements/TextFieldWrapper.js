import React from 'react';
// import { FormControl, Input } from '@mui/material/TextField'
import TextField from '@mui/material/TextField';
//import { useField, Field, Formik } from 'formik';
import { useField} from 'formik';

const TextFieldWrapper = ({
  name,
  ...otherProps
}) => {
  const [field, meta, helpers] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    //fullWidth: true,
    variant: 'outlined'
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  console.log(field);
  // console.log(configTextfield);
  // console.log(otherProps);


  return (
    <TextField {...configTextfield} />
  );
};

export default TextFieldWrapper;