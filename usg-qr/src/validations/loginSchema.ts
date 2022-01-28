import * as Yup from 'yup';

export const signInSchema = Yup.object().shape({
    email: Yup.string()
    .email("Invalid email address!")
    .max(500, "Email is too long - should not exceed 500 chars.")
    .required("Required!"),
  
    password: Yup.string()
      .required("No password provided!")
      .min(7, "Password is too short - should be 7 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });
  