import React, { useState } from "react";
import Card from "../../../../components/cards/skeleton/Card";
import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SubCard from "../../../../components/cards/SubCard";
import { ACTIVEBOOK, ACTIVEISSUE, BOOKS } from "../../../../store/queryKeys";
import { getActiveBook, searchBooks } from "../../../../services/bookService";
import { useGetData } from "../../../../hooks/useGetData";
import { useSearchBooks } from "../../../../hooks/useSearchBooks";
import IssueSearch from "./IssueSearchBar";
import { getActiveIssue } from "../../../../services/issueService";


export default function IssueOptions() {

const {isLoading, data ,isError, error, isFetching, refetch} = useGetData(ACTIVEISSUE, getActiveIssue);
  return (
      console.log(data),
    <>
      {isLoading ? (
        <Card />
      ) : (
        <SubCard title="Active Issue">
          <FormControl fullWidth>
            <IssueSearch activeIssue={data} />
          </FormControl>
        </SubCard>
      )}
    </>
  );
}
