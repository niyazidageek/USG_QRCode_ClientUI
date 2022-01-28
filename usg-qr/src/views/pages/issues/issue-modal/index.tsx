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
import DateAdapter from "@mui/lab/AdapterMoment";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import console from "console";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export default function IssueModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={DateAdapter}>
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
          <DialogContent>
            <Grid container spacing={2} paddingTop={"5px"}>
              <Grid item xs={12} md={6}>
                <TextField required fullWidth label="Name" variant="outlined" />
              </Grid>
              <Grid item xs={12} md={6}>
                <MobileDatePicker
                  label="Start Date"
                  inputFormat="DD/MM/yyyy"
                  value={new Date()}
                  onChange={() => {}}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />   
              </Grid>
              <Grid item xs={12}>
                  <Button variant="contained" component="label">
                    Attach images
                    <input type="file" multiple hidden />
                  </Button>
                </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              <Typography fontSize={"1rem"} color={"primary"}>
                Cancel
              </Typography>
            </Button>
            <Button onClick={handleClose}>
              <Typography fontSize={"1rem"} color={"primary"}>
                Add
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </div>
  );
}
