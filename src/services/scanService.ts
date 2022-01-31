import { httpClient } from "./httpClient";

export const getScansCount = () => {
  return httpClient.get(`scan/scanscount`);
};

export const getScanStatistics = (year: any = null) => {
  return year == null
    ? httpClient.get(`scan/scanstatistics`)
    : httpClient.get(`scan/scanstatistics/${year}`);
};

export const getScansByClient = (id: any, page: any = 0, size: any = 3) => {
  return httpClient.get(`scan/scansbyclient/${id}?page=${page}&size=${size}`);
};

export const getScans = (page: any = 0, size: any = 3, issueId: any = null) => {
  return issueId
    ? httpClient.get(`scan/scans?page=${page}&size=${size}&issueId=${issueId}`)
    : httpClient.get(`scan/scans?page=${page}&size=${size}`);
};

export const getScanById = (id: any) => {
  return httpClient.get(`scan/scans/${id}`);
};

export const deleteScan = (id: any) => {
  return httpClient.delete(`scan/deletescan/${id}`);
};


//   export const editBook = (id:any, data:any, token:any) => {
//       return httpClient.put("option/editoption/"+id, data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//     };