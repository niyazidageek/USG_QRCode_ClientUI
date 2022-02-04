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
import { useFormik } from "formik";
import DateAdapter from "@mui/lab/AdapterMoment";
import { useMutation, useQueryClient } from "react-query";
import MuiAlert from "@mui/material/Alert";
import SaveIcon from "@mui/icons-material/Save";
import { Snackbar } from "@mui/material";
import { ISSUES } from "../../../../store/queryKeys";
import moment from "moment";
import { issueSchema } from "../../../../validations/issueSchema";
import { createIssue } from "../../../../services/issueService";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";

export default function IssueModal() {
  const [open, setOpen] = React.useState(false);
  const alert = useAlert();
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation(
    (data:any)=>createIssue(data, jwt),
    {
      onSuccess: (data: any) => {
        alert.show(data.data.message, {type:'success'})
        queryClient.invalidateQueries([ISSUES]);
        setOpen(false)
      },
      onError: (err: any) => {
        alert.show(err.response.data, {type:'success'})
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      date: moment.utc().local().format()
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
          <Typography fontSize={"1rem"}>Add an issue</Typography>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid container spacing={2} paddingTop={"5px"}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Name"
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
                Add
              </Typography>
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
