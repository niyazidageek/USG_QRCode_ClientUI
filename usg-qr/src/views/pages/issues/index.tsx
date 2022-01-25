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
  import IssuesTable from "./issues-table";

  // ==============================|| SAMPLE PAGE ||============================== //
  
  const IssuesPage = () => (
    <MainCard title="Books">
      <Grid container>
          <IssuesTable/>
      </Grid>
    </MainCard>
  );
  
  export default IssuesPage;
  