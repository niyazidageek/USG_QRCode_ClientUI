import { httpClient } from "./httpClient";

export const getIssuesCount = () => {
  return httpClient.get("issue/issuescount");
};

export const getActiveIssue = () => {
  return httpClient.get("issue/activeissue");
};

export const searchIssues = (input: any = "") => {
  return httpClient.get(`issue/searchissues?input=${input}`);
};

export const setActiveIssue = (id: any) => {
  return httpClient.put(`issue/setactiveissue/${id}`);
};

export const getIssues = (page: any = 0, size: any = 3) => {
  return httpClient.get(`issue/issues?page=${page}&size=${size}`);
};

export const getIssueById = (id: any) => {
  return httpClient.get(`issue/issues/${id}`);
};

export const getIssueStatistics = (year: any = null) => {
  return year
    ? httpClient.get(`issue/issuestatistics/${year}`)
    : httpClient.get(`issue/issuestatistics`);
};

export const getAllIssueStatistics = () => {
  return httpClient.get(`issue/allissuestatistics`);
};

export const editIssue = (id: any, data: any) => {
  return httpClient.put(`issue/editissue/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteIssue = (id: any) => {
  return httpClient.delete(`issue/deleteissue/${id}`);
};

export const createIssue = (data: any) => {
  return httpClient.post("issue/createissue", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

//   export const getBooks=(id:any, page:any=0, size:any=3)=>{
//       return httpClient.get(`book/books?page=${page}&size=${size}`)
//   }

//   export const getBooksCount=()=>{
//     return httpClient.get(`book/bookscount`)
// }

//   export const getBookById = (id:any) => {
//     return httpClient.get("option/getoptionbyid/" + id);
//   };

//   export const editBook = (id:any, data:any, token:any) => {
//       return httpClient.put("option/editoption/"+id, data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//     };

//     export const deleteBook = (id:any) =>{
//       return httpClient.delete("option/deleteoption/"+id)
//     }
