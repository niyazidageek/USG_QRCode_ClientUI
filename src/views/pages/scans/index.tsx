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
  import ScansTable from "./scans-table/ScansTable";

  // ==============================|| SAMPLE PAGE ||============================== //
  
  const ScansPage = () => (
    <MainCard title="Scans">
      <Grid container>
          <ScansTable/>
      </Grid>
    </MainCard>
  );
  
  export default ScansPage;
  