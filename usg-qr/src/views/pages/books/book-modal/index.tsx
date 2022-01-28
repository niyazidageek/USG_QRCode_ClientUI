import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

export default function BookModal() {
  const [open, setOpen] = React.useState(false);

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
          <Typography fontSize={'1rem'}>
            Add a book
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} paddingTop={'5px'}>
            <Grid item xs={12} md={6}>
              <TextField required fullWidth label="Name" variant="outlined" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Description"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField required fullWidth label="Url" variant="outlined" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <Typography fontSize={'1rem'} color={"primary"}>
              Cancel
            </Typography>
          </Button>
          <Button onClick={handleClose}>
            <Typography fontSize={'1rem'} color={"primary"}>
              Add
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
