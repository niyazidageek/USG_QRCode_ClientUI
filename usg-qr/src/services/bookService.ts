import { httpClient } from "./httpClient";

// export const createBook = (data:any, token:any) => {
//     return httpClient.post("option/createoption", data, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   };

export const createBook = (data:any) =>{
  return httpClient.post(`book/createbook`, data)
}

export const searchBooks = (input: any = "") => {
  return httpClient.get(`book/searchbooks?input=${input}`);
};

export const getActiveBook = () => {
  return httpClient.get("book/activebook");
};

export const getBooks = (page: any = 0, size: any = 3) => {
  return httpClient.get(`book/books?page=${page}&size=${size}`);
};

export const getBooksCount = () => {
  return httpClient.get(`book/bookscount`);
};

export const setActiveBook = (id: any) => {
  return httpClient.put(`book/setactivebook/${id}`);
};

export const getBookById = (id: any) => {
  return httpClient.get(`book/books/${id}`);
};

export const editBook = (id: any, data: any) => {
  return httpClient.put(`book/editbook/${id}`, data);
};

export const deleteBook = (id:any) =>{
  return httpClient.delete(`book/deletebook/${id}`)
}

// export const editBook = (id:any, data:any, token:any) => {
//     return httpClient.put("option/editoption/"+id, data, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   };


