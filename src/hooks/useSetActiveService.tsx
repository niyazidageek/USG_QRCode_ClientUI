import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { setActiveService } from "../services/endpointService";
import { ACTIVESERVICE } from "../store/queryKeys";

export const useSetActiveService = () => {
  const queryClient = useQueryClient();
  return useMutation(setActiveService, {
    onSuccess: () => {
        queryClient.invalidateQueries(ACTIVESERVICE)
    },
  });
};
