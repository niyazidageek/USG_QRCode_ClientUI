import { httpClient } from "./httpClient";

export const getScansCount = (jwt: any) => {
  return httpClient.get(`scan/scanscount`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getScanStatistics = (year: any = null, jwt: any) => {
  return year == null
    ? httpClient.get(`scan/scanstatistics`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
    : httpClient.get(`scan/scanstatistics/${year}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
};

export const getScansByClient = (
  id: any,
  page: any = 0,
  size: any = 3,
  jwt: any
) => {
  return httpClient.get(`scan/scansbyclient/${id}?page=${page}&size=${size}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getScans = (
  page: any = 0,
  size: any = 3,
  issueId: any = null,
  jwt: any
) => {
  return issueId
    ? httpClient.get(
        `scan/scans?page=${page}&size=${size}&issueId=${issueId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
    : httpClient.get(`scan/scans?page=${page}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
};

export const getScanById = (id: any, jwt: any) => {
  return httpClient.get(`scan/scans/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const deleteScan = (id: any, jwt: any) => {
  return httpClient.delete(`scan/deletescan/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
};
