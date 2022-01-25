// material-ui
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

  // ==============================|| SAMPLE PAGE ||============================== //
  
  const SettingsPage = () => (
    <MainCard title="Services">
      <Grid container>
          <ServicesTable/>
      </Grid>
    </MainCard>
  );
  
  export default SettingsPage;
  