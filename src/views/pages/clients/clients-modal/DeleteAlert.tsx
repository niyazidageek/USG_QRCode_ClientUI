import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import MuiAlert from "@mui/material/Alert";
import { Box, Snackbar, Typography } from "@mui/material";
import DangerousIcon from "@mui/icons-material/Dangerous";
import DeleteIcon from "@mui/icons-material/Delete";
import { Icon } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { deleteIssue } from "../../../../services/issueService";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";

export default function DeleteAlert({ issueId }: any) {
  const [open, setOpen] = React.useState(false);
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const navigate = useNavigate();
  const alert = useAlert()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate, isLoading, isError } = useMutation((id)=>deleteIssue(id, jwt), {
    onSuccess: (data: any) => {
      alert.show(data.data.message, {type:'success'})
      navigate("/issues");
    },
    onError: (err: any) => {
      alert.show(err.response.data, {type:'error'})
    },
  });

  function handleClick() {
    mutate(issueId);
  }

  return (
    <div>
      <Button
        color="error"
        style={{
          marginLeft: "0.5rem",
          marginBottom: "0.5rem",
          fontWeight: "bold",
          color: "white",
        }}
        variant="contained"
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <DangerousIcon color="error" style={{ fontSize: "3rem" }} />
              <Typography
                color="black"
                textAlign={"center"}
                fontWeight={"bold"}
                fontSize={"1.5rem"}
              >
                Are you sure?
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>

            <LoadingButton
              onClick={() => handleClick()}
              loadingPosition="start"
              startIcon={<DeleteIcon />}
              variant="outlined"
              color="error"
              loading={isLoading}
              type="submit"
            >
              Delete
            </LoadingButton>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}
