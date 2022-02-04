import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { LoadingButton } from "@mui/lab";
import { useGetData } from "../../../../hooks/useGetData";
import { ACTIVEISSUE } from "../../../../store/queryKeys";
import { getActiveIssue } from "../../../../services/issueService";
import IssueSearch from "./IssueSearch";
import Skeleton from "@mui/material/Skeleton";
import { useFormik } from "formik";
import { randomizeClientsSchema } from "../../../../validations/randomizeClientsSchema";
import { getRandomClient } from "../../../../services/clientService";
import { useMutation, useQueryClient } from "react-query";
import { FormHelperText } from "@mui/material";
import { RandomClientModal } from "../clients-modal/randomClientModal";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";

export default function IssueSearchBar() {

  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const alert = useAlert()

  const { isLoading, data, isError, error, isFetching, refetch } = useGetData(
    ACTIVEISSUE,
    getActiveIssue
  );

  const [activeIssue, setActiveIssue]: any = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState(null);

  React.useEffect(() => {
    setActiveIssue(data);
  }, [isFetching]);


  const {
    mutate,
    isLoading: randomizeLoading,
    isError: randomizeError,
  } = useMutation((issueId)=>getRandomClient(issueId, jwt), {
    onSuccess: (data: any) => {
      setEmail(()=>data.data.email)
      setOpen(()=>true)
    },
    onError: (err: any) => {
      alert.show(err.response.data.message, {type:'error'})
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      activeIssueId: activeIssue?.id,
    },
    validationSchema: randomizeClientsSchema,
    onSubmit: (values) => {
      mutate(values.activeIssueId);
    },
  });

  return (
    <>
      {isLoading ? (
        <Skeleton height={50} />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
            <Box width={'100%'} flexDirection={'column'}>
            <IssueSearch
              error={formik.errors.activeIssueId}            
              invalid={
                formik.touched.activeIssueId &&
                Boolean(formik.errors.activeIssueId)
              }
              activeIssue={data}
              setActiveIssue={setActiveIssue}
            />
            </Box>
           
            <ArrowRightAltIcon fontSize="large" />
            <Box sx={{position: 'relative' }}>
            <Button
              type="submit"
              variant="contained"
              disabled={randomizeLoading}
              style={{ color: "white", backgroundColor:'purple' ,fontWeight: "bold" }}
            >
              Randomize
            </Button>
            {randomizeLoading && (
          <CircularProgress
            size={24}
            sx={{
              color: 'white',
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
        </Box> 
          </Box>
        </form>
      )}
      <RandomClientModal email={email} open={open} setOpen={setOpen} />
    </>
  );
}
