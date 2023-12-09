import * as yup from "yup";

// min 6 characters, 1 uppercase, 1 lowercase letter, 1 numeric digit
const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Field is required"),
  password: yup
    .string()
    .min(6, "Password should be a minimum of 6 characters")
    .matches(passwordRules, {
      message: "Password must include an uppercase, lowercase and a number",
    })
    .required("Field is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Field is required"),
  firstName: yup.string().required("Field is required"),
  businessName: yup.string().required("Field is required"),
  lastName: yup.string(),
  phoneNo: yup.number("Must be of number type").required("Field is required"),
});

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Field is required"),
  password: yup.string().required("Field is required"),
});
