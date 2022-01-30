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
import { getActiveService, getServices } from "../../../../services/endpointService";
import { useSetActiveService } from "../../../../hooks/useSetActiveService";
import { useQueries } from "react-query";
export default function ServiceOptions() {



  const results = useQueries([
    {
      queryKey: [ACTIVESERVICE],
      queryFn: () => getActiveService()
    },
    {
      queryKey: [SERVICEOPTIONS],
      queryFn: () => getServices()
    },
  ]);


  const {mutate} = useSetActiveService();

  const isLoading = results.some(result => result.isLoading)

  const services = results[1].data?.data
  const activeService = results[0].data?.status == 204 ? null : results[0].data?.data



  function handleChange(id:any){
    mutate(id);
  }

  return (
    <>
      {isLoading ? (
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
              defaultValue={activeService ? activeService.id : ''}
              onChange={(e)=>handleChange(e.target.value)}
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
