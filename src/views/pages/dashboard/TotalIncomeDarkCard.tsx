import PropTypes from "prop-types";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import MainCard from "../../../components/cards/MainCard";
import TotalIncomeCard from "../../../components/cards/skeleton/TotalIncomeCard";

import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useGetData } from "../../../hooks/useGetData";
import { BOOKSCOUNT } from "../../../store/queryKeys";
import { getBooksCount } from "../../../services/bookService";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";

const CardWrapper = styled(MainCard)(({ theme }: any) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: "50%",
    top: -30,
    right: -180,
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: "50%",
    top: -160,
    right: -130,
  },
}));

const TotalIncomeDarkCard = () => {
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const alert = useAlert();
  const theme: any = useTheme();
  const { isLoading, data, isError, error, isFetching, refetch }:any = useGetData(
    BOOKSCOUNT,
    ()=>getBooksCount(jwt)
  );
  
  if(error){
    alert.show(error.response.data, {type:'error'})
  }

  return (
    <>
      {isLoading || isError ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      backgroundColor: theme.palette.primary[800],
                      color: "#fff",
                    }}
                  >
                    <LibraryBooksIcon fontSize="inherit" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45,
                  }}
                  primary={
                    <Typography variant="h4" sx={{ color: "#fff" }}>
                      {data}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "primary.light", mt: 0.25 }}
                    >
                      Total Books
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

export default TotalIncomeDarkCard;
