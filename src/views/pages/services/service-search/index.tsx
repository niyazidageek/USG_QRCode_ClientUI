import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSearchServices } from "../../../../hooks/useSearchServices";
import { useMutation } from "react-query";
import { searchServices } from "../../../../services/endpointService";
import { useSelector } from "react-redux";

export default function SearchSection({ setRows, setCancel, setLoadingSearch }: any) {
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const { mutate, data, isLoading }: any = useMutation((input)=>searchServices(input, jwt), {
      onSuccess:()=>{
          if(data?.data!=undefined){
            setRows(data.data)
          }
      }
  });
  const [input, setInput] = React.useState("");
  const navigate = useNavigate();

  function handleChange(id: any) {
    navigate(`${id}`);
  }

  function handleSearch(inputField: any) {
    if (inputField.trim() != "") {
      if (inputField !== input) {
        setInput(() => inputField);
        mutate(input)
      }
    } else {
      setInput(() => inputField);
      if (inputField !== input) {
        setCancel(true)
      }
    }
  }

  React.useEffect(() => {
    setLoadingSearch(isLoading)
  }, [isLoading]);

  const services = data?.data;


  return (
    <TextField
      value={input}
      onChange={(e: any) => handleSearch(e.target.value)}
      fullWidth
      id="outlined-search"
      label="Search field"
      type="search"
    />
  );
}
