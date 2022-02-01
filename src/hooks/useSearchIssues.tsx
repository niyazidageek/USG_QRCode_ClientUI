import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { searchIssues } from "../services/issueService";
import { useSelector } from "react-redux";

export const useSearchIssues = () => {
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  return useMutation((input)=>searchIssues(input, jwt));
};
