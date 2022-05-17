import * as Yup from "yup";

export const userLoginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Too short! Password must contain at least 6 characters")
    .required("Valid password required"),
});

export const userSignupValidationSchema = Yup.object({
  username: Yup.string()
    .min(2, "Too short; 2 characters required")
    .max(50, "Too Long!")
    .required("Valid name required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Too short! Password must contain at least 6 characters")
    .required("Valid password required"),
});

export const userValidationSchemas = {
  userLoginValidationSchema,
  userSignupValidationSchema,
};

//export default userValidationSchema;
