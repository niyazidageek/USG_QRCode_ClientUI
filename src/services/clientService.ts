import { httpClient } from "./httpClient";

export const searchClients = (input: any = "") => {
  return httpClient.get(`client/searchclients?input=${input}`);
};

export const getRandomClient = (issueId: any) => {
  return httpClient.get(`client/randomclient/${issueId}`);
};

export const getClients = (page: any = 0, size: any = 3) => {
  return httpClient.get(`client/clients?page=${page}&size=${size}`);
};

export const getClientById = (id: any) => {
  return httpClient.get(`client/clients/${id}`);
};
