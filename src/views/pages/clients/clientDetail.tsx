import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import MainCard from "../../../components/cards/MainCard";
import SubCard from "../../../components/cards/SubCard";
import { useParams } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import GoBackButton from "../../../components/buttons/GoBackButton";
import moment from "moment";
import { useGetData } from "../../../hooks/useGetData";
import Card from "../../../components/cards/skeleton/Card";
import { CLIENTS } from "../../../store/queryKeys";
import { useGetDataById } from "../../../hooks/useGetDataById";
import CloseIcon from "@mui/icons-material/Close";
import DeleteAlert from "./clients-modal/DeleteAlert";
import { getClientById } from "../../../services/clientService";
import ScansTable from "./clients-scan-table";
import { useAlert } from "react-alert";

function ClientPage() {
  let { id } = useParams();
  const alert = useAlert()
  const { isLoading, data, isError, error, isFetching, refetch }:any =
    useGetDataById(CLIENTS, id, getClientById);


    if(error){
      alert.show(error.response.data.message, {type:'error'})
    }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <MainCard title="Client details">
          <Grid spacing={2} container>
            <Grid xs={12} md={6} item>
              {isLoading||isError ? (
                <Card />
              ) : (
                <SubCard
                  title={`Information about client #${data.id}`}
                >
                  <Typography fontWeight={"bold"} py={2}>
                    Email:{" "}
                    <Typography display={"inline-block"}>
                      {data.email}
                    </Typography>
                  </Typography>
                  <Typography fontWeight={"bold"} py={2}>
                    Registration date:{" "}
                    <Typography display={"inline-block"}>
                      {moment
                        .utc(data.registrationDate)
                        .local()
                        .format("MM/DD/yyyy HH:mm")}
                    </Typography>
                  </Typography>
                </SubCard>
              )}
            </Grid>
            <Grid xs={12} md={6} item>
              {isLoading||isError ? (
                <Card />
              ) : (
                <Box
                  justifyContent={"space-between"}
                  flexDirection={"column"}
                  height={"100%"}
                  display={"flex"}
                >
                  <Box
                    height={"max-content"}
                    justifyContent={"end"}
                    display={"flex"}
                  >
                    <DeleteAlert clientId={id} />
                  </Box>
                  <Box
                    height={"max-content"}
                    justifyContent={"end"}
                    display={"flex"}
                  >
                    <GoBackButton />
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard title="Scans">
          <ScansTable clientId={id} />
        </MainCard>
      </Grid>
    </Grid>
  );
}

export default ClientPage;
