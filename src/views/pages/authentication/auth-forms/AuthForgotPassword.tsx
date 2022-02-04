import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import AnimateButton from "../../../../components/extended/AnimateButton";
import { useMutation } from "react-query";
import { forgotPassword, login } from "../../../../services/authService";
import { useAlert } from "react-alert";
import { forgotPasswordSchema } from "../../../../validations/forgotPasswordSchema";
import { useNavigate } from "react-router-dom";


const FirebaseLogin = () => {
  const theme: any = useTheme();
  const alert = useAlert();
    const navigate = useNavigate();

  const { mutate, isLoading, isError } = useMutation(forgotPassword, {
    onSuccess: (data:any) => {
        alert.show(data.data.message, {type:'success'})
    },
    onError:(err:any)=>{
      alert.show(err.response.data.message, {type:'error'})
    }
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          fullWidth
          error={formik.touched.email && Boolean(formik.errors.email)}
          sx={{ ...theme.typography.customInput }}
        >
          <InputLabel htmlFor="outlined-adornment-email-login">
            Email Address
          </InputLabel>
          <OutlinedInput
            type="email"
            onChange={formik.handleChange}
            name="email"
            label="Email Address"
            onBlur={formik.handleBlur}
            inputProps={{}}
          />
          {formik.touched.email && formik.errors.email && (
            <FormHelperText error id="standard-weight-helper-text-email-login">
              {formik.errors.email}
            </FormHelperText>
          )}
        </FormControl>
      

        <Box sx={{ mt: 2 }}>
          <AnimateButton>
            <Button
              disableElevation
              disabled={isLoading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="secondary"
            >
              Submit
            </Button>
          </AnimateButton>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          
          <Typography
            onClick={()=>navigate(-1)}
            variant="subtitle1"
            color="secondary"
            sx={{ textDecoration: "none", cursor: "pointer", mt:'15px' }}
          >
              Go back
          </Typography>
        </Stack>
      </form>
    </>
  );
};

export default FirebaseLogin;
