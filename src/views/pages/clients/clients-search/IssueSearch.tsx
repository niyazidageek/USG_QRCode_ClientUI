import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useSearchBooks } from "../../../../hooks/useSearchBooks";
import { useGetData } from "../../../../hooks/useGetData";
import { useSetActiveIssue } from "../../../../hooks/useSetActiveIssue";
import { useSearchIssues } from "../../../../hooks/useSearchIssues";
import { Paper } from "@mui/material";


export default function IssueSearch({activeIssue, setActiveIssue, invalid, error}:any) {
  const {mutate, data, isLoading}:any = useSearchIssues();
  const [input, setInput]= React.useState("");

  function handleChange(issue:any){
    setActiveIssue(issue)
  }

  function handleSearch(inputField:any){
    if(inputField.trim()!=""){
      if(inputField!==input){
        setInput(()=>inputField)
      }
    }
  }

  React.useEffect(()=>{
    mutate(input)
  },[input])

  const issues = data?.data;

  const CustomPaper = (props:any) => {
    return <Paper elevation={8} {...props} />;
  };

  return (
      <Autocomplete
        fullWidth
        defaultChecked
        onChange={(e:any, value:any)=>handleChange(value)}
        defaultValue={!!activeIssue ? activeIssue : null}
        getOptionLabel={(option:any) => option.name}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        sx={{display:'inline-block'}}
        PaperComponent={CustomPaper}
        options={issues?issues:[]}
        onKeyUpCapture={(e:any)=>handleSearch(e.target.value)}
        loading={isLoading}
        renderInput={(params) => (
          <TextField
            {...params}
            error={invalid}
            label={ error ? error : "Search for an issue..."}
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
