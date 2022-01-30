import { useQuery } from "react-query";
import axios from "axios";

export const useGetDataById = (queryKey:string, id:any, promiseFunc:any) => {
  return useQuery([queryKey, id], ()=>promiseFunc(id), {
    select: (data:any) => {
      return data.data;
    },
  });
};
