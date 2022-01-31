import PropTypes from "prop-types";

// material-ui
import { useTheme, styled } from "@mui/material/styles";
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

import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { ACTIVESERVICE, SERVICES } from "../../../store/queryKeys";
import { getActiveService } from "../../../services/endpointService";
import { useGetData } from "../../../hooks/useGetData";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

const CardWrapper = styled(MainCard)(({ color }) => ({
  overflow: "hidden",
  position: "relative",
  backgroundColor: color.main,
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: "50%",
    top: -30,
    right: -180,
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    borderRadius: "50%",
    top: -160,
    right: -130,
  },
}));

const TotalIncomeLightCard = () => {
  const theme: any = useTheme();
  const [color, setColor]: any = useState(theme.palette.success);
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    ACTIVESERVICE,
    getActiveService
  );

  useEffect(() => {
    if (data?.status == 204) {
      setColor(theme.palette.error);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading || isError ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper color={color} border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      backgroundColor: color.dark,
                      color: "#fff",
                    }}
                  >
                    <MiscellaneousServicesIcon fontSize="inherit" />
                  </Avatar>
                </ListItemAvatar>
                {data?.status == 204 ? (
                  <ListItemText
                    sx={{
                      py: 0,
                      mt: 0.45,
                      mb: 0.45,
                    }}
                    primary={
                      <Typography sx={{ color: "#fff" }} variant="h4">
                        No active service!
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "primary.light", mt: 0.25 }}
                      >
                        Warning!
                      </Typography>
                    }
                  />
                ) : (
                  <ListItemText
                    sx={{
                      py: 0,
                      mt: 0.45,
                      mb: 0.45,
                    }}
                    primary={
                      <Typography sx={{ color: "#fff" }} variant="h4">
                        {data?.data.description}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "primary.light", mt: 0.25 }}
                      >
                        Active Service
                      </Typography>
                    }
                  />
                )}
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalIncomeLightCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalIncomeLightCard;
