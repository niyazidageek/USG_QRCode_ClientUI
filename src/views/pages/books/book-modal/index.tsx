import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {  Grid, } from "@mui/material";
import { Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import { bookSchema } from "../../../../validations/bookSchema";
import { useMutation, useQueryClient } from "react-query";
import { createBook } from "../../../../services/bookService";
import SaveIcon from "@mui/icons-material/Save"
import { BOOKS } from "../../../../store/queryKeys";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";

export default function AddBookModal() {
  const [open, setOpen] = React.useState(false);
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const alert = useAlert();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation(
    (data:any)=>createBook(data, jwt),
    {
      onSuccess: (data: any) => {
        alert.show(data.data.message, {type:'success'})
        queryClient.invalidateQueries([BOOKS]);
        setOpen(false);
      },
      onError: (err: any) => {
        alert.show(err.response.data.message, {type:'error'})
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      name:"",
      description: "",
      url: "",
    },
    validationSchema: bookSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color={"success"}
        style={{ color: "white", fontWeight: "bold" }}
        onClick={handleClickOpen}
      >
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography fontSize={"1rem"}>Add a book</Typography>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid container spacing={2} paddingTop={"5px"}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
                  defaultValue={formik.initialValues.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  name="name"
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="description"
                  defaultValue={formik.initialValues.description}
                  fullWidth
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Description"
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  defaultValue={formik.initialValues.url}
                  fullWidth
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Url"
                  name="url"
                  error={formik.touched.url && Boolean(formik.errors.url)}
                  helperText={formik.touched.url && formik.errors.url}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <LoadingButton variant="outlined" onClick={handleClose}>
              <Typography fontSize={"1rem"} color={"primary"}>
                Close
              </Typography>
            </LoadingButton>
            <LoadingButton
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
              loading={isLoading}
              type="submit"
            >
              <Typography fontSize={"1rem"} color={"primary"}>
                Add
              </Typography>
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
