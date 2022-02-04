import React from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function AlertTemplate({ style, options, message, close }: any) {
  return (
       <MuiAlert severity={options.type} sx={{ width: "100%", my:'0.5rem'}}>
          {message}
        </MuiAlert>
  );
}