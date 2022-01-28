import { useQuery } from "react-query";
import axios from "axios";

export const useGetData = (queryKey:string, promiseFunc:any) => {
  return useQuery([queryKey], promiseFunc, {
    select: (data:any) => {
      return data.data;
    },
  });
};
