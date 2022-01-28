import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { searchBooks } from "../services/bookService";

export const useSearchBooks = () => {
  const queryClient = useQueryClient();
  return useMutation(searchBooks);
};
