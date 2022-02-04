import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import EarningCard from "./EarningCard";
import TotalOrderLineChartCard from "./TotalOrderLineChartCard";
import TotalIncomeDarkCard from "./TotalIncomeDarkCard";
import TotalIncomeLightCard from "./TotalIncomeLightCard";
import TotalGrowthBarChart from "./TotalGrowthBarChart";
import { gridSpacing } from "../../../store/constants";
import { useSelector } from "react-redux";
import { useWebSocket } from "../../../hooks/useWebSocket";
import { ONSCAN } from "../../../store/webWocketMethods";
import { useGetData } from "../../../hooks/useGetData";
import { SCANSCOUNT } from "../../../store/queryKeys";
import { getScansCount } from "../../../services/scanService";
import { useAlert } from "react-alert";

const Dashboard = () => {

  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const {isLoading, data, isError, error, isFetching, refetch}:any = useGetData(SCANSCOUNT, ()=>getScansCount(jwt));
  const alert = useAlert()
  const [count, setCount] = useState(0);

  useWebSocket(ONSCAN, ()=>setCount((prev:any)=>prev+1))

  useEffect(()=>{
    if(data) setCount(data)
  },[isLoading, isFetching])

  if(error){
    alert.show(error.response.data, {type:'error'})
  }

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <EarningCard isLoading={isLoading||isError} count={count} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalOrderLineChartCard />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeDarkCard />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalIncomeLightCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <TotalGrowthBarChart isLoadingCount={isLoading||isError} count={count} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
