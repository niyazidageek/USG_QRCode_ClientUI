import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { searchServices } from "../services/endpointService";

export const useSearchServices = () => {
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  return useMutation((input)=>searchServices(input, jwt));
};
