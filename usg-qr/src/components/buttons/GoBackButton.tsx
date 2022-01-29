import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function GoBackButton() {
    const navigate = useNavigate();
  return (
    <Button onClick={()=>navigate(-1)} color="primary"  style={{fontWeight:'bold', color:'white' }} variant="contained">
      Go Back
    </Button>
  );
}
