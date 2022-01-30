import * as Yup from "yup";

export const randomizeClientsSchema = Yup.object().shape({
  activeIssueId: Yup.number()
    .typeError("Required!")
    .required("Required!"),
});
