import PropTypes from "prop-types";
import { useState } from "react";

// material-ui
import { useTheme, styled } from "@mui/material/styles";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";

// third-party
import Chart from "react-apexcharts";
import MainCard from "../../../components/cards/MainCard";
import SkeletonTotalOrderCard from "../../../components/cards/skeleton/EarningCard";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import {
  ISSUEALLSTATISTICS,
  ISSUEMONTHSSTATISTICS,
  ISSUESCOUNT,
} from "../../../store/queryKeys";
import {
  getAllIssueStatistics,
  getIssuesCount,
  getIssueStatistics,
} from "../../../services/issueService";
import { useGetData } from "../../../hooks/useGetData";
import { useQueries } from "react-query";
import { useLineMonthsChart } from "../../../hooks/useLineMonthsChart";
import { useLineYearsChart } from "../../../hooks/useLineYearsChart";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";

const CardWrapper = styled(MainCard)(({ theme }: any) => ({
  backgroundColor: theme.palette.primary.dark,
  color: "#fff",
  overflow: "hidden",
  position: "relative",
  "&>div": {
    position: "relative",
    zIndex: 5,
  },
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: "50%",
    zIndex: 1,
    top: -85,
    right: -95,
    [theme.breakpoints.down("sm")]: {
      top: -105,
      right: -140,
    },
  },
  "&:before": {
    content: '""',
    position: "absolute",
    zIndex: 1,
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: "50%",
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down("sm")]: {
      top: -155,
      right: -70,
    },
  },
}));

const TotalOrderLineChartCard = () => {
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const theme: any = useTheme();
  const [timeValue, setTimeValue] = useState(false);
  const handleChangeTime = (event: any, newValue: any) => {
    setTimeValue(newValue);
  };
  const alert = useAlert();

  const { isLoading, data, isError, error, isFetching, refetch }:any = useGetData(
    ISSUESCOUNT,
    ()=>getIssuesCount(jwt)
  );


  const results = useQueries([
    {
      queryKey: [ISSUEMONTHSSTATISTICS],
      queryFn: () => getIssueStatistics(null,jwt),
    },
    {
      queryKey: [ISSUEALLSTATISTICS],
      queryFn: () => getAllIssueStatistics(jwt),
    },
  ]);


  if(error){
    alert.show(error.response.data, {type:'error'})
  }

  const monthsChart = useLineMonthsChart(results[0]?.data?.data);
  const yearsChart = useLineYearsChart(results[1]?.data?.data);

  return (
    <>
      {isLoading ||
      isError ||
      results.some((result) => result.isLoading) ||
      results.some((result) => result.isError) ||
      !monthsChart ||
      !yearsChart ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.primary[800],
                        color: "#fff",
                        mt: 1,
                      }}
                    >
                      <NewspaperIcon fontSize="inherit" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Button
                      disableElevation
                      variant={timeValue ? "contained" : "text"}
                      size="small"
                      sx={{ color: "inherit" }}
                      onClick={(e) => handleChangeTime(e, true)}
                    >
                      Current year
                    </Button>
                    <Button
                      disableElevation
                      variant={!timeValue ? "contained" : "text"}
                      size="small"
                      sx={{ color: "inherit" }}
                      onClick={(e) => handleChangeTime(e, false)}
                    >
                      All time
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 0.75 }}>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography
                          sx={{
                            fontSize: "2.125rem",
                            fontWeight: 500,
                            mr: 1,
                            mt: 1.75,
                            mb: 0.75,
                          }}
                        >
                          {data}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            fontSize: "1rem",
                            fontWeight: 500,
                            color: theme.palette.primary[200],
                          }}
                        >
                          Total Issues
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    {timeValue ? (
                      <Chart {...monthsChart} />
                    ) : (
                      <Chart {...yearsChart} />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalOrderLineChartCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalOrderLineChartCard;
