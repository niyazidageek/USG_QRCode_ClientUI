import { httpClient } from "./httpClient";

export const createBook = (data: any, jwt: any) => {
  return httpClient.post(`book/createbook`, data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const searchBooks = (input: any = "", jwt: any) => {
  return httpClient.get(`book/searchbooks?input=${input}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getActiveBook = (jwt: any) => {
  return httpClient.get("book/activebook", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getBooks = (page: any = 0, size: any = 3, jwt: any) => {
  return httpClient.get(`book/books?page=${page}&size=${size}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getBooksCount = (jwt: any) => {
  return httpClient.get(`book/bookscount`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const setActiveBook = (id: any, jwt: any) => {
  return httpClient.put(`book/setactivebook/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getBookById = (id: any, jwt: any) => {
  return httpClient.get(`book/books/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const editBook = (id: any, data: any, jwt: any) => {
  return httpClient.put(`book/editbook/${id}`, data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const deleteBook = (id: any, jwt: any) => {
  return httpClient.delete(`book/deletebook/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};
