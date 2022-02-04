import * as Yup from 'yup';

export const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
    .email("Invalid email address!")
    .max(500, "Email is too long - should not exceed 500 chars.")
    .required("Required!"),
  });
  