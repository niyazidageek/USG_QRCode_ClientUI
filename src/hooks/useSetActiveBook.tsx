import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { ACTIVEBOOK } from "../store/queryKeys";
import { setActiveBook } from "../services/bookService";

export const useSetActiveBook = () => {
  const queryClient = useQueryClient();
  return useMutation(setActiveBook, {
    onSuccess: () => {
        queryClient.invalidateQueries(ACTIVEBOOK)
    },
  });
};
