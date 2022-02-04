import React from "react";
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
import { ACTIVESERVICE, SERVICEOPTIONS } from "../../../../store/queryKeys";
import {
  getActiveService,
  getServices,
} from "../../../../services/endpointService";
import { useSetActiveService } from "../../../../hooks/useSetActiveService";
import { isError, useQueries } from "react-query";
import { useSelector } from "react-redux";
import { useAlert } from "react-alert";
export default function ServiceOptions() {
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const alert = useAlert();

  const results = useQueries([
    {
      queryKey: [ACTIVESERVICE],
      queryFn: () => getActiveService(),
    },
    {
      queryKey: [SERVICEOPTIONS],
      queryFn: () => getServices(jwt),
    },
  ]);

  const { mutate } = useSetActiveService();

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);

  const services = results[1].data?.data;
  const activeService =
    results[0].data?.status == 204 ? null : results[0].data?.data;

  if (results.some((result) => result.error))
    results.forEach((res: any) => {
      res.error && alert.show(res.error.response.data, { type: "error" });
    });

  function handleChange(id: any) {
    mutate(id);
  }

  return (
    <>
      {isLoading || isError ? (
        <Card />
      ) : (
        <SubCard title="Active Service">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Service</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Service"
              defaultChecked
              defaultValue={activeService ? activeService.id : ""}
              onChange={(e) => handleChange(e.target.value)}
            >
              {services.length != 0 ? (
                services.map((s: any) => (
                  <MenuItem value={s.id}>{s.description}</MenuItem>
                ))
              ) : (
                <Typography textAlign={"center"}>No options...</Typography>
              )}
            </Select>
          </FormControl>
        </SubCard>
      )}
    </>
  );
}
