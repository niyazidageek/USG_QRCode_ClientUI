import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import MainCard from "../../../components/cards/MainCard";
import { useParams } from "react-router-dom";
// ==============================|| SAMPLE PAGE ||============================== //

function BooksPage() {
  let { id } = useParams();
  return (
    <MainCard title="Book details">
      <Grid container></Grid>
    </MainCard>
  );
}

export default BooksPage;
