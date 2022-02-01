import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormHelperText, Grid, InputLabel, OutlinedInput } from "@mui/material";
import { Typography, FormControl, FormControlLabel } from "@mui/material";
import {
  LoadingButton,
  LocalizationProvider,
  MobileDatePicker,
} from "@mui/lab";
import { useRef } from "react";
import { useFormik } from "formik";
import { createContext } from "react";
import DateAdapter from "@mui/lab/AdapterMoment";
import { bookSchema } from "../../../../validations/bookSchema";
import { useMutation, useQueryClient } from "react-query";
import { editBook } from "../../../../services/bookService";
import MuiAlert from "@mui/material/Alert";
import SaveIcon from "@mui/icons-material/Save";
import { Snackbar } from "@mui/material";
import { ACTIVEISSUE, BOOKS, ISSUES } from "../../../../store/queryKeys";
import moment from "moment";
import * as yup from "yup";
import { issueSchema } from "../../../../validations/issueSchema";
import { editIssue } from "../../../../services/issueService";
import { useSelector } from "react-redux";

export default function EditIssueModal({ issueId, issue }: any) {
  const [open, setOpen] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [message, setMessage] = React.useState(null);
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation(
    (data: any) => editIssue(issueId, data, jwt),
    {
      onSuccess: (data: any) => {
        setMessage(data.data.message);
        setToastOpen(true);
        queryClient.invalidateQueries([ISSUES, issueId]);
      },
      onError: (err: any) => {
        setToastOpen(true);
        setMessage(err.message);
      },
    }
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: issue.name,
      date: moment.utc(issue.date).local().format(),
    },
    validationSchema: issueSchema,
    onSubmit: (values: any) => {
      values.date = moment.utc(values.date).format();
      let form_data = new FormData();
      for (var key in values) {
        form_data.append(key, values[key]);
      }
      mutate(form_data);
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={toastOpen}
        autoHideDuration={1000}
        onClose={() => {
          setToastOpen(false);
        }}
        key={"top" + "center"}
      >
        <MuiAlert severity={isError ? "error" : "success"}>{message}</MuiAlert>
      </Snackbar>
      <Button
        variant="contained"
        color={"warning"}
        style={{ color: "white", fontWeight: "bold" }}
        onClick={handleClickOpen}
      >
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography fontSize={"1rem"}>Edit the issue</Typography>
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
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <MobileDatePicker
                    label="Start Date"
                    inputFormat="DD/MM/yyyy"
                    value={formik.values.date}
                    onChange={(e: any) => {
                      formik.setFieldValue(
                        "date",
                        moment.utc(e._d).local().format()
                      );
                    }}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                  {formik.touched.date && formik.errors.date && (
                    <FormHelperText error>{formik.errors.date}</FormHelperText>
                  )}
                </LocalizationProvider>
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
                Save
              </Typography>
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
