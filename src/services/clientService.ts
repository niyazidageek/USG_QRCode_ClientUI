import { httpClient } from "./httpClient";

export const searchClients = (input: any = "", jwt: any) => {
  return httpClient.get(`client/searchclients?input=${input}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getRandomClient = (issueId: any, jwt: any) => {
  return httpClient.get(`client/randomclient/${issueId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getClients = (page: any = 0, size: any = 3, jwt: any) => {
  return httpClient.get(`client/clients?page=${page}&size=${size}`,{
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getClientById = (id: any, jwt: any) => {
  return httpClient.get(`client/clients/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};
