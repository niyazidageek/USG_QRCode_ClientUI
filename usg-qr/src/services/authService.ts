import { httpClient } from "./httpClient";

export const login=(data:any)=>{
    return httpClient.post("auth/login", data)
}

// export const createBook = (data:any, token:any) => {
//     return httpClient.post("option/createoption", data, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });
//   };


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