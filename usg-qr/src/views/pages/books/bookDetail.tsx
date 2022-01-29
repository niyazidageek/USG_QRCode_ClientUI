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
import EditBookModal from "./book-modal/EditBookModal";
import GoBackButton from "../../../components/buttons/GoBackButton";
import { useGetData } from "../../../hooks/useGetData";
import Card from "../../../components/cards/skeleton/Card";
import { getBookById } from "../../../services/bookService";
import { BOOKS } from "../../../store/queryKeys";
import { useGetDataById } from "../../../hooks/useGetDataById";
import { Link } from "@mui/material";
import { BookContext } from "../../../contexts/bookContext";
import CloseIcon from "@mui/icons-material/Close";
import { createContext, useEffect } from "react";
import DeleteAlert from "./book-modal/DeleteAlert";

function BooksPage() {
  let { id } = useParams();
  const { isLoading, data, isError, error, isFetching, refetch } =
    useGetDataById(BOOKS, id, getBookById);

  return (
    <MainCard title="Book details">
      <Grid spacing={2} container>
        <Grid xs={12} md={6} item>
          {isLoading ? (
            <Card />
          ) : (
            <SubCard
              style={{ minWidth: "400px" }}
              title={`Information about book #${data.id}`}
            >
              <Typography fontWeight={"bold"} py={2}>
                Name:{" "}
                <Typography display={"inline-block"}>{data.name}</Typography>
              </Typography>
              <Typography fontWeight={"bold"} py={2}>
                Description:{" "}
                <Typography display={"inline-block"}>
                  {data.description}
                </Typography>
              </Typography>
              <Typography fontWeight={"bold"} py={2}>
                Url:{" "}
                <Typography display={"inline-block"}>
                  <Link
                    underline="none"
                    onClick={() => {
                      window.open(data.url, "_blank");
                    }}
                    component="button"
                  >
                    {data.url}
                  </Link>
                </Typography>
              </Typography>
              <Typography
                display="inline-block"
                alignItems={"center"}
                fontWeight={"bold"}
                py={2}
              >
                Status:{" "}
                <Box display={"inline-block"}>
                  <Typography
                    lineHeight={"normal"}
                    fontWeight={"bold"}
                    color={data.isActive ? "green" : "red"}
                    alignItems={"center"}
                    display={"flex"}
                  >
                    {data.isActive ? "Active" : "Not active"}
                    {data.isActive ? (
                      <CheckIcon
                        style={{ marginLeft: "0.1rem", fontWeight: "lighter" }}
                      />
                    ) : (
                      <CloseIcon
                        style={{ marginLeft: "0.1rem", fontWeight: "lighter" }}
                      />
                    )}
                  </Typography>
                </Box>
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
                 <EditBookModal bookId={id} book={data} />
               
                <DeleteAlert bookId={id} />
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

export default BooksPage;
