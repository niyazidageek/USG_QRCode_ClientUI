import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { searchClients } from "../../../../services/clientService";
import { useSelector } from "react-redux";

export default function SearchSection() {
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const { mutate, data, isLoading }: any = useMutation((input)=>searchClients(input, jwt))
  const [input, setInput] = React.useState("");
  const navigate = useNavigate();

  function handleChange(id: any) {
    navigate(`${id}`);
  }

  function handleSearch(inputField: any) {
    if (inputField.trim() != "") {
      if (inputField !== input) {
        setInput(() => inputField);
      }
    }
  }

  React.useEffect(() => {
    mutate(input);
  }, [input]);

  const clients = data?.data;

  const CustomPaper = (props: any) => {
    return <Paper elevation={8} {...props} />;
  };

  return (
    <Autocomplete
      fullWidth
      onChange={(e: any, value: any) => handleChange(value.id)}
      getOptionLabel={(option: any) => option.email}
      isOptionEqualToValue={(option, value) => option.email === value.email}
      options={clients ? clients : []}
      onKeyUpCapture={(e: any) => handleSearch(e.target.value)}
      loading={isLoading}
      PaperComponent={CustomPaper}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a client..."
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
