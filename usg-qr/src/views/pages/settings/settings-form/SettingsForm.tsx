import React from "react";
import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import SubCard from "../../../../components/cards/SubCard";

export default function SettingsForm() {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <SubCard title="Active Service">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Service</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Service"
              //   onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </SubCard>
      </Grid>
      <Grid item xs={12} sm={6}>
        <SubCard title="Active Book">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Book</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Book"
              //   onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </SubCard>
      </Grid>
      <Grid item xs={12} sm={6}>
        <SubCard title="Active Issue">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Issue</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Issue"
              //   onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </SubCard>
      </Grid>
    </>
  );
}
