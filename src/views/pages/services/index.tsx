import {
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
  } from "@mui/material";
  import MainCard from "../../../components/cards/MainCard";
  import ServicesTable from "./services-table";
  
  const SettingsPage = () => (
    <MainCard title="Services">
      <Grid container>
          <ServicesTable/>
      </Grid>
    </MainCard>
  );
  
  export default SettingsPage;
  