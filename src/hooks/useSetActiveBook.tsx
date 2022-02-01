import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { ACTIVEBOOK } from "../store/queryKeys";
import { setActiveBook } from "../services/bookService";
import { useSelector } from "react-redux";

export const useSetActiveBook = () => {
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const queryClient = useQueryClient();
  return useMutation((id)=>setActiveBook(id,jwt), {
    onSuccess: () => {
      queryClient.invalidateQueries(ACTIVEBOOK);
    },
  });
};
