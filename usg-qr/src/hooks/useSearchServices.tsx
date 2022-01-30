import { useMutation } from "react-query";
import { searchServices } from "../services/endpointService";

export const useSearchServices = () => {
  return useMutation(searchServices);
};
