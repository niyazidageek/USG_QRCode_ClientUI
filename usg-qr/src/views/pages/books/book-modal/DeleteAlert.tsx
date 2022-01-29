import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import MuiAlert from "@mui/material/Alert";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Snackbar, Typography } from "@mui/material";
import DangerousIcon from "@mui/icons-material/Dangerous";
import DeleteIcon from "@mui/icons-material/Delete";
import { Icon } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useMutation } from "react-query";
import { Navigate } from "react-router-dom";
import { deleteBook } from "../../../../services/bookService";
import { useNavigate } from "react-router-dom";

export default function DeleteAlert({ bookId }: any) {
  const [open, setOpen] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [message, setMessage] = React.useState(null);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate, isLoading, isError } = useMutation(deleteBook, {
    onSuccess: (data: any) => {
      setMessage(data.data.message);
      setToastOpen(true);
      navigate("/books");
    },
    onError: (err: any) => {
      setToastOpen(true);
      setMessage(err.message);
    },
  });

  function handleClick() {
    mutate(bookId);
  }

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
