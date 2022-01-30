import * as Yup from "yup";

export const issueSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name is too short - shoul be at least 3 chars.")
    .max(255, "Name is too long - should not exceed 255 chars.")
    .required("Required!"),
});
