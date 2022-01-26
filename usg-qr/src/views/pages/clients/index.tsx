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
  import ClientsTable from "./clients-table"

  // ==============================|| SAMPLE PAGE ||============================== //
  
  const IssuesPage = () => (
    <MainCard title="Clients">
      <Grid container>
          <ClientsTable/>
      </Grid>
    </MainCard>
  );
  
  export default IssuesPage;
  