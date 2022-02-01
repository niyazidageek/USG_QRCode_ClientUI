import * as Yup from "yup";

export const serviceSchema = Yup.object().shape({
  description: Yup.string()
    .min(10, "Description is too short - shoul be at least 10 chars.")
    .max(500, "Name is too long - should not exceed 500 chars.")
    .required("Required!"),

  url: Yup.string()
    .min(10, "Url is too short - shoul be at least 10 chars.")
    .required("Required!"),
});
