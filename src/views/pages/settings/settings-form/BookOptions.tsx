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


export default function BookOptions() {

    const {isLoading, data ,isError, error, isFetching, refetch} = useGetData(ACTIVEBOOK, getActiveBook);
  return (
    <>
      {isLoading ? (
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