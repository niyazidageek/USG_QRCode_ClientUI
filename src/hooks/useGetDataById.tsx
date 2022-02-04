import { useQuery } from "react-query";
import { useSelector } from "react-redux";

export const useGetDataById = (queryKey:string, id:any, promiseFunc:any) => {
  const jwt = useSelector((state:any)=>state.authReducer.jwt)
  return useQuery([queryKey, id], ()=>promiseFunc(id, jwt), {
    select: (data:any) => {
      return data.data;
    },
  });
};
