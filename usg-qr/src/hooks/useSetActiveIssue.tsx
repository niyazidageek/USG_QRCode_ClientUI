import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { ACTIVEISSUE } from "../store/queryKeys";
import { setActiveIssue } from "../services/issueService";

export const useSetActiveIssue = () => {
  const queryClient = useQueryClient();
  return useMutation(setActiveIssue, {
    onSuccess: () => {
        queryClient.invalidateQueries(ACTIVEISSUE)
    },
  });
};
