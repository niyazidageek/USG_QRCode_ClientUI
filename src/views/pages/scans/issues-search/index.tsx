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
import { useSearchIssues } from "../../../../hooks/useSearchIssues";
import SearchIcon from '@mui/icons-material/Search';

export default function IssuesSearch({setSelectedIssue}:any) {
  const { mutate, data, isLoading }: any = useSearchIssues();
  const [input, setInput] = React.useState("");
  const navigate = useNavigate();

  function handleChange(id: any) {
    setSelectedIssue(id)
  }

  const issues = data?.data;
  
  function handleSearch(inputField: any) {
    if (inputField.trim() !== "") {
      if (inputField !== input) {
        setInput(() => inputField);
      }
    }
    else{
      setSelectedIssue(null)
    }
  }

  React.useEffect(() => {
    mutate(input);
  }, [input]);

  

  const CustomPaper = (props: any) => {
    return <Paper elevation={8} {...props} />;
  };

  return (
    <Autocomplete
      style={{width:'50%'}}
      onChange={(e: any, value: any) => value&&handleChange(value.id)}
      getOptionLabel={(option: any) => option.name}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      options={issues ? issues : []}
      onKeyUpCapture={(e: any) => handleSearch(e.target.value)}
      loading={isLoading}
      PaperComponent={CustomPaper}
      disablePortal
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for an issue..."
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) :null}
              </>
            ),
          }}
        />
      )}
    />
  );
}
