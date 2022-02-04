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
import { ACTIVEBOOK, BOOKS } from "../../../../store/queryKeys";
import { getActiveBook, searchBooks } from "../../../../services/bookService";
import { useGetData } from "../../../../hooks/useGetData";
import { useSearchBooks } from "../../../../hooks/useSearchBooks";
import BookSearch from "./BookSearchBar";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";

export default function BookOptions() {
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const alert = useAlert();

  const { isLoading, data, isError, error, isFetching, refetch }: any =
    useGetData(ACTIVEBOOK, () => getActiveBook(jwt));

  if (error) {
    alert.show(error.response.data);
  }
  return (
    <>
      {isLoading || isError ? (
        <Card />
      ) : (
        <SubCard title="Active Book">
          <FormControl fullWidth>
            <BookSearch activeBook={data} />
          </FormControl>
        </SubCard>
      )}
    </>
  );
}
