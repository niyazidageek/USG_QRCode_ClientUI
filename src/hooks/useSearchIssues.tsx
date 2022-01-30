import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { searchIssues } from "../services/issueService";

export const useSearchIssues = () => {
  return useMutation(searchIssues);
};
