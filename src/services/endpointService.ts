import { httpClient } from "./httpClient";

export const getActiveService = () => {
  return httpClient.get("serviceendpoint/activeserviceendpoint");
};

export const getServices = ( jwt: any,page = 0, size = 3) => {
  return httpClient.get(
    `serviceendpoint/serviceendpoints/?page=${page}&size=${size}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
};

export const editService = (id: any, data: any, jwt: any) => {
  return httpClient.put(`serviceendpoint/editserviceendpoint/${id}`, data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const createService = (data: any, jwt: any) => {
  return httpClient.post(`serviceendpoint/createserviceendpoint`, data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const setActiveService = (id: any, jwt: any) => {
  return httpClient.put(`serviceendpoint/setactiveserviceendpoint/${id}`, null,{
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const searchServices = (input: any = "", jwt: any) => {
  return httpClient.get(
    `serviceendpoint/searchserviceendpoints?input=${input}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
};

export const deleteService = (id: any, jwt: any) => {
  return httpClient.delete(`serviceendpoint/deleteserviceendpoint/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};
