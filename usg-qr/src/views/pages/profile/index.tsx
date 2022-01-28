// material-ui
import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SubCard from "../../../components/cards/SubCard";
import MainCard from "../../../components/cards/MainCard";
import EmailIcon from "@mui/icons-material/Email";
import { Box } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

// ==============================|| SAMPLE PAGE ||============================== //

const ProfilePage = () => (
  <MainCard title="Profile">
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <SubCard title="Information">
          <List style={{ minWidth: "300px" }}>
            <ListItem>
              <ListItemAvatar>
                <EmailIcon />
              </ListItemAvatar>
              <ListItemText>niyazibabayev@mail.ru</ListItemText>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <LocalPhoneIcon />
              </ListItemAvatar>
              <ListItemText>(+994) 50 210 63 31</ListItemText>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <AccountCircleIcon />
              </ListItemAvatar>
              <ListItemText>niyazi_16</ListItemText>
            </ListItem>
          </List>
        </SubCard>
      </Grid>
      <Grid item xs={12} md={8}>
        <SubCard style={{height:'100%'}} title="About me">
          <List style={{ minWidth: "300px" }}>
            <ListItem>
              <Typography>
                Hello my name is Israfil I am a governor at USG department!
              </Typography>
            </ListItem>
          </List>
        </SubCard>
      </Grid>
    </Grid>
  </MainCard>
);

export default ProfilePage;
