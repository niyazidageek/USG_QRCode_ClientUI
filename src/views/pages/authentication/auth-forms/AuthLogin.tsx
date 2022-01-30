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
// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signInSchema } from "../../../../validations/loginSchema";
import { useMutation } from "react-query";
import { login } from "../../../../services/authService";
import { loginAction } from "../../../../redux/actions/authActions";

const FirebaseLogin = () => {
  const theme: any = useTheme();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const { mutate, isLoading, isError } = useMutation(login, {
    onSuccess: (data:any) => {
      data.data = {...data.data, ...{rememberMe:rememberMe}}
      dispatch(loginAction(data.data))
    },
    onError:(err:any)=>{
      setOpen(true)
      setError(err.message)

    }
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
        open={open} 
        autoHideDuration={1000}
        onClose={()=>{
          setOpen(false)  
        }}
        key={'top' + 'center'}
      >
      <MuiAlert severity="error">{error}</MuiAlert>
      </Snackbar>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Sign in with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>

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
        <FormControl
          fullWidth
          error={formik.touched.password && Boolean(formik.errors.password)}
          sx={{ ...theme.typography.customInput }}
        >
          <InputLabel htmlFor="outlined-adornment-password-login">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-login"
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="large"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            inputProps={{}}
          />
          {formik.touched.password && Boolean(formik.errors.password) && (
            <FormHelperText
              error
              id="standard-weight-helper-text-password-login"
            >
              {formik.errors.password}
            </FormHelperText>
          )}
        </FormControl>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={rememberMe}
                onChange={(event) => setRememberMe(() => event.target.checked)}
                name="checked"
                color="primary"
              />
            }
            label="Remember me"
          />
          <Typography
            variant="subtitle1"
            color="secondary"
            sx={{ textDecoration: "none", cursor: "pointer" }}
          >
            Forgot Password?
          </Typography>
        </Stack>

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
              Sign in
            </Button>
          </AnimateButton>
        </Box>
      </form>
    </>
  );
};

export default FirebaseLogin;
