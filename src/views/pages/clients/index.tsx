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

  
  const ClientsPage = () => (
    <MainCard title="Clients">
      <Grid container>
          <ClientsTable/>
      </Grid>
    </MainCard>
  );
  
  export default ClientsPage;
  