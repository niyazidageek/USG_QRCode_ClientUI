import * as Yup from 'yup';

export const resetPasswordSchema = Yup.object().shape({
    email: Yup.string()
    .email("Invalid email address!")
    .max(500, "Email is too long - should not exceed 500 chars.")
    .required("Required!"),
  
    newPassword: Yup.string()
      .required("No password provided!")
      .min(7, "Password is too short - should be 7 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),

      confirmNewPassword: Yup.string()
      .required("No password provided!")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match!"),

      token: Yup.string()
      .required("Required!")
      .min(6, "Must contain 6 digits!")
      .max(6, "Must contain 6 digits!")
  });
  