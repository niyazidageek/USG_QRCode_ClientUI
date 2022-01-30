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
  import BooksTable from "./books-table";

  // ==============================|| SAMPLE PAGE ||============================== //
  
  const BooksPage = () => (
    <MainCard title="Books">
      <Grid container>
          <BooksTable/>
      </Grid>
    </MainCard>
  );
  
  export default BooksPage;
  