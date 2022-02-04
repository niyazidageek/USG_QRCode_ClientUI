import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import ReactPinField from "react-pin-field";
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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signInSchema } from "../../../../validations/loginSchema";
import { useMutation } from "react-query";
import { login, resetPassword } from "../../../../services/authService";
import {
  loginAction,
  logOutAction,
} from "../../../../redux/actions/authActions";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { resetPasswordSchema } from "../../../../validations/resetPasswordSchema";

const ResetPasswordForm = () => {
  const theme: any = useTheme();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const alert = useAlert();

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const { mutate, isLoading, isError } = useMutation(resetPassword, {
    onSuccess: (data: any) => {
      alert.show(data.data.message, { type: "success" });
      dispatch(logOutAction);
      navigate("../login");
    },
    onError: (err: any) => {
      alert.show(err.response.data.message, { type: "error" });
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      confirmNewPassword: "",
      token: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values?: any) => {
      delete values.confirmNewPassword;
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
        <FormControl
          fullWidth
          error={
            formik.touched.newPassword && Boolean(formik.errors.newPassword)
          }
          sx={{ ...theme.typography.customInput }}
        >
          <InputLabel htmlFor="outlined-adornment-password-login">
            New password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-login"
            type={showPassword ? "text" : "password"}
            name="newPassword"
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
            label="New Password"
            inputProps={{}}
          />
          {formik.touched.newPassword && Boolean(formik.errors.newPassword) && (
            <FormHelperText
              error
              id="standard-weight-helper-text-password-login"
            >
              {formik.errors.newPassword}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          fullWidth
          error={
            formik.touched.confirmNewPassword &&
            Boolean(formik.errors.confirmNewPassword)
          }
          sx={{ ...theme.typography.customInput }}
        >
          <InputLabel htmlFor="outlined-adornment-password-login">
            Confirm new password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-login"
            type={showPassword ? "text" : "password"}
            name="confirmNewPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Confirm new password"
            inputProps={{}}
          />
          {formik.touched.confirmNewPassword &&
            Boolean(formik.errors.confirmNewPassword) && (
              <FormHelperText
                error
                id="standard-weight-helper-text-password-login"
              >
                {formik.errors.confirmNewPassword}
              </FormHelperText>
            )}
        </FormControl>

        <FormControl
          fullWidth
          error={formik.touched.token && Boolean(formik.errors.token)}
          sx={{ ...theme.typography.customInput }}
        >
          <ReactPinField
            name="token"
            validate={new RegExp("^[0-9]+$")}
            className="pin-field"
            type={"text"}
            length={6}
            onChange={(e: any) => formik.setFieldValue("token", e)}
          />
          {formik.touched.token && Boolean(formik.errors.token) && (
            <FormHelperText
              error
              id="standard-weight-helper-text-password-login"
            >
              {formik.errors.token}
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
              Reset
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
            onClick={() => navigate(-1)}
            variant="subtitle1"
            color="secondary"
            sx={{ textDecoration: "none", cursor: "pointer", mt: "15px" }}
          >
            Go back
          </Typography>
        </Stack>
      </form>
    </>
  );
};

export default ResetPasswordForm;
