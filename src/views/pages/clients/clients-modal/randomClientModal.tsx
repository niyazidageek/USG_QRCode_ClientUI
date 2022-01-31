import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box } from "@mui/material";
import Confetti from "react-confetti";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function RandomClientModal({ open, setOpen, email }: any) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "purple",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography fontWeight={"bold"} color={"white"} fontSize={"1rem"}>
              Randomizer results
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          width={"100%"}
          height={"100%"}
        >
          <Typography
            textAlign={'center'}
            display={"inline-block"}
            fontWeight={"bold"}
            style={{lineBreak:'anywhere'}}
            color={"black"}
            fontSize={"3rem"}
          >
            Winner:{" "}
            <Typography
              style={{lineBreak:'anywhere'}}
             textAlign={'center'}
              display={"inline-block"}
              fontSize={"3rem"}
              fontWeight={"bold"}
              color={"purple"}
            >
              {email}
            </Typography>
          </Typography>

          <Confetti gravity={0.2} numberOfPieces={400} />
        </Box>
      </Dialog>
    </div>
  );
}
