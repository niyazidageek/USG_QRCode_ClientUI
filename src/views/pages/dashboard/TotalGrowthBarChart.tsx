import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import { Skeleton } from "@mui/material";

import SkeletonTotalGrowthBarChart from "../../../components/cards/skeleton/TotalGrowthBarChart";
import MainCard from "../../../components/cards/MainCard";
import { gridSpacing } from "../../../store/constants";
import { useQueries, useQuery } from "react-query";
import { SCANSTATISTICS } from "../../../store/queryKeys";
import { getScanStatistics } from "../../../services/scanService";
import { useChart } from "../../../hooks/useChart";

const TotalGrowthBarChart = ({ count, isLoadingCount }: any) => {
  const [year, setYear] = useState(null);
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    [SCANSTATISTICS],
    () => getScanStatistics(year, jwt)
  );

  useEffect(() => {
    refetch();
  }, [year]);

  useEffect(() => {
    setYear(data?.data.selectedYear);
  }, [isLoading]);

  const chart = useChart(data?.data.scansCounts, data?.data.possibleYears);

  return (
    <>
      {!chart ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">Scan Dynamics</Typography>
                    </Grid>
                    <Grid item>
                      {isLoadingCount ? (
                        <Typography variant="h3">
                        <Skeleton />
                      </Typography>
                        
                      ) : (
                        <Typography variant="h3">
                          Overall:{" "}
                          {count != 1 ? count + " scans" : count + " scan"}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Select
                    disabled={!data?.data.possibleYears}
                    id="standard-select-currency"
                    value={year ?? null}
                    renderValue={(v) => v}
                    onChange={(e: any) => {
                      setYear(e.target.value);
                    }}
                  >
                    {data?.data.possibleYears.map((option: any) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart {...chart} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

export default TotalGrowthBarChart;
