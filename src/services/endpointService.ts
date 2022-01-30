import { httpClient } from "./httpClient";

export const getActiveService=()=>{
    return httpClient.get("serviceendpoint/activeserviceendpoint")
}

export const getServices=(page: any = 0, size: any = 3)=>{
    return httpClient.get(`serviceendpoint/serviceendpoints/?page=${page}&size=${size}`)
}

export const editService = (id: any, data: any) => {
    return httpClient.put(`serviceendpoint/editserviceendpoint/${id}`, data);
  };

  export const createService = (data: any) => {
    return httpClient.post(`serviceendpoint/createserviceendpoint`, data);
  };

export const setActiveService=(id:any)=>{
    return httpClient.put(`serviceendpoint/setactiveserviceendpoint/${id}`)
}

export const searchServices = (input: any = "") => {
    return httpClient.get(`serviceendpoint/searchserviceendpoints?input=${input}`);
  };
  


export const deleteService = (id: any) => {
    return httpClient.delete(`serviceendpoint/deleteserviceendpoint/${id}`);
  };
  
