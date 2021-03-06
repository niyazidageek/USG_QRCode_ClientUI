import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useSearchBooks } from "../../../../hooks/useSearchBooks";
import { useGetData } from "../../../../hooks/useGetData";
import { ACTIVEBOOK } from "../../../../store/queryKeys";
import { getActiveBook } from "../../../../services/bookService";
import { useSetActiveBook } from "../../../../hooks/useSetActiveBook";
import { Paper } from "@mui/material";


export default function BookSearch({activeBook}:any) {
  const {mutate, data, isLoading}:any = useSearchBooks();
  const [input, setInput]= React.useState("");
  const {mutate:setActiveBook}:any = useSetActiveBook();

  function handleChange(id:any){
    setActiveBook(id)
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

  const books = data?.data;

  const CustomPaper = (props:any) => {
    return <Paper elevation={8} {...props} />;
  };

  return (
      <Autocomplete
        fullWidth
        defaultChecked
        onChange={(e:any, value:any)=>handleChange(value.id)}
        defaultValue={!!activeBook ? activeBook : null}
        getOptionLabel={(option:any) => option.name}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        sx={{display:'inline-block'}}
        options={books?books:[]}
        PaperComponent={CustomPaper}
        onKeyUpCapture={(e:any)=>handleSearch(e.target.value)}
        loading={isLoading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for a book..."
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
