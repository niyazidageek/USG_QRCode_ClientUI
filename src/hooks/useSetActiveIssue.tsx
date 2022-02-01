import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { ACTIVEISSUE } from "../store/queryKeys";
import { setActiveIssue } from "../services/issueService";
import { useSelector } from "react-redux";

export const useSetActiveIssue = () => {
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const queryClient = useQueryClient();
  return useMutation((id)=>setActiveIssue(id, jwt), {
    onSuccess: () => {
        queryClient.invalidateQueries(ACTIVEISSUE)
    },
  });
};
