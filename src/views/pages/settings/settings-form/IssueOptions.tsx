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
import { useAlert } from "react-alert";

export default function IssueOptions() {
  const alert = useAlert();

  const { isLoading, data, isError, error, isFetching, refetch }: any =
    useGetData(ACTIVEISSUE, getActiveIssue);

  if (error) {
    alert.show(error.response.data, { type: "error" });
  }

  return (
    <>
      {isLoading || isError ? (
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
