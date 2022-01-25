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
import SettingsForm from "./settings-form/SettingsForm";

// ==============================|| SAMPLE PAGE ||============================== //

const SettingsPage = () => (
  <MainCard title="Settings">
    <Grid container spacing={2}>
      <SettingsForm />
    </Grid>
  </MainCard>
);

export default SettingsPage;
