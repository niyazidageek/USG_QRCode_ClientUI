import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { searchBooks } from "../services/bookService";
import { useSelector } from "react-redux";

export const useSearchBooks = () => {
  const jwt = useSelector((state: any) => state.authReducer.jwt);
  const queryClient = useQueryClient();
  return useMutation((input)=>searchBooks(input, jwt));
};
