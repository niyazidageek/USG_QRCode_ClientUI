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
import { useGetData } from "../../../hooks/useGetData";
import Card from "../../../components/cards/skeleton/Card";
import { SCANS } from "../../../store/queryKeys";
import { useGetDataById } from "../../../hooks/useGetDataById";
import CloseIcon from "@mui/icons-material/Close";
import DeleteAlert from "./scan-modal/DeleteAlert";
import moment from "moment";
import { getScanById } from "../../../services/scanService";

function ScanPage() {
  let { id } = useParams();
  const { isLoading, data, isError, error, isFetching, refetch } =
    useGetDataById(SCANS, id, getScanById);

  return (
    <MainCard title="Scan details">
      <Grid spacing={2} container>
        <Grid xs={12} md={6} item>
          {isLoading ? (
            <Card />
          ) : (
            <SubCard
              style={{ minWidth: "400px" }}
              title={`Information about scan #${data.id}`}
            >
              <Typography fontWeight={"bold"} py={2}>
                Device:{" "}
                <Typography display={"inline-block"}>
                  {data.deviceType}
                </Typography>
              </Typography>
              <Typography fontWeight={"bold"} py={2}>
                Scan Date:{" "}
                <Typography display={"inline-block"}>
                  {moment.utc(data.date).local().format("MM/DD/yyyy HH:mm")}
                </Typography>
              </Typography>
              <Typography
                alignItems={"center"}
                fontWeight={"bold"}
                py={2}
              >
                Issue:{" "}
                <Typography display={"inline-block"}>
                  {data.issue.name}
                </Typography>
              </Typography>
              <Typography
                alignItems={"center"}
                fontWeight={"bold"}
                py={2}
              >
                Client:{" "}
                <Typography display={"inline-block"}>
                  {data.client.email}
                </Typography>
              </Typography>
            </SubCard>
          )}
        </Grid>
        <Grid xs={12} md={6} item>
          {isLoading ? (
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
                <DeleteAlert scanId={id} />
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
  );
}

export default ScanPage;
