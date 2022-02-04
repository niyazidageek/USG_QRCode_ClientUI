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
} from "@mui/lab";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { editBook } from "../../../../services/bookService";
import MuiAlert from "@mui/material/Alert";
import SaveIcon from "@mui/icons-material/Save";
import { Snackbar } from "@mui/material";
import {SERVICES } from "../../../../store/queryKeys";
import { editService } from "../../../../services/endpointService";
import { serviceSchema } from "../../../../validations/serviceSchema";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";

export default function EditServiceModal({ serviceId, service }: any) {
  const [open, setOpen] = React.useState(false);
  const alert = useAlert()
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation(
    (data: any) => editService(serviceId, data, jwt),
    {
      onSuccess: (data: any) => {
        alert.show(data.data.message, {type:'success'})
        queryClient.invalidateQueries([SERVICES]);
      },
      onError: (err: any) => {
        alert.show(err.response.data, {type:'error'})
      },
    }
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      description: service.description,
      url: service.url
    },
    validationSchema: serviceSchema,
    onSubmit: (values: any) => {
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
        color={"warning"}
        style={{ color: "white", fontWeight: "bold" }}
        onClick={handleClickOpen}
      >
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography fontSize={"1rem"}>Edit the service</Typography>
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid container spacing={2} paddingTop={"5px"}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Description"
                  defaultValue={formik.initialValues.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  name="description"
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Url"
                  defaultValue={formik.initialValues.url}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  name="url"
                  error={formik.touched.url && Boolean(formik.errors.url)}
                  helperText={formik.touched.url && formik.errors.url}
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
                Save
              </Typography>
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
