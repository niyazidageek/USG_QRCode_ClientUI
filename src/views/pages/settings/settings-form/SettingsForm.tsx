import React from "react";
import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SubCard from "../../../../components/cards/SubCard";
import { useGetData } from "../../../../hooks/useGetData";
import {
  ACTIVEBOOK,
  ACTIVEISSUE,
  ISSUES,
  SERVICES,
} from "../../../../store/queryKeys";
import { getServices } from "../../../../services/endpointService";
import Card from "../../../../components/cards/skeleton/Card";
import { useQueries } from "react-query";
import { getActiveIssue } from "../../../../services/issueService";
import { getActiveBook } from "../../../../services/bookService";
import ServiceOptions from "./ServiceOptions";
import BookOptions from "./BookOptions";
import IssueOptions from "./IssueOptions";

export default function SettingsForm() {

  return (
    <>
      <Grid item xs={12} sm={6}>
        <ServiceOptions />
      </Grid>
      <Grid item xs={12} sm={6}>
        <BookOptions />
      </Grid>
      <Grid item xs={12} sm={6}>
        <IssueOptions />
      </Grid>
    </>
  );
}
