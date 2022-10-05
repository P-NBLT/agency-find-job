import * as yup from "yup";

const signupSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).required(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  firstName: yup.string().required(),
  lastName: yup.string().matches(/[a-z]/gi).required(),
});

export default signupSchema;
