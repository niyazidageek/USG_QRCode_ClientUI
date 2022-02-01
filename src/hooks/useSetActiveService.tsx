import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { setActiveService } from "../services/endpointService";
import { ACTIVESERVICE } from "../store/queryKeys";
import { useSelector } from "react-redux";

export const useSetActiveService = () => {
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const queryClient = useQueryClient();
  return useMutation((id)=>setActiveService(id, jwt), {
    onSuccess: () => {
        queryClient.invalidateQueries(ACTIVESERVICE)
    },
  });
};
