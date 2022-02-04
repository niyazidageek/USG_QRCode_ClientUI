import { httpClient } from "./httpClient";

export const getIssuesCount = (jwt:any) => {
  return httpClient.get("issue/issuescount", {
    headers:{
      Authorization:`Bearer ${jwt}`
    }
  });
};

export const getActiveIssue = () => {
  return httpClient.get("issue/activeissue");
};

export const searchIssues = (input: any = "", jwt:any) => {
  return httpClient.get(`issue/searchissues?input=${input}`,{
    headers:{
      Authorization:`Bearer ${jwt}`
    }
  });
};

export const setActiveIssue = (id: any, jwt:any) => {
  return httpClient.put(`issue/setactiveissue/${id}`,null,{
    headers:{
      Authorization:`Bearer ${jwt}`
    }
  });
};

export const getIssues = (page: any = 0, size: any = 3,jwt:any) => {
  return httpClient.get(`issue/issues?page=${page}&size=${size}`,{
    headers:{
      Authorization:`Bearer ${jwt}`
    }
  });
};

export const getIssueById = (id: any, jwt:any) => {
  return httpClient.get(`issue/issues/${id}`,{
    headers:{
      Authorization:`Bearer ${jwt}`
    }
  });
};

export const getIssueStatistics = (year: any = null, jwt:any) => {
  return year
    ? httpClient.get(`issue/issuestatistics/${year}`,{
      headers:{
        Authorization:`Bearer ${jwt}`
      }
    })
    : httpClient.get(`issue/issuestatistics`,{
      headers:{
        Authorization:`Bearer ${jwt}`
      }
    });
};

export const getAllIssueStatistics = (jwt:any) => {
  return httpClient.get(`issue/allissuestatistics`,{
    headers:{
      Authorization:`Bearer ${jwt}`
    }
  });
};

export const editIssue = (id: any, data: any, jwt:any) => {
  return httpClient.put(`issue/editissue/${id}`, data, {
    headers: {
      Authorization:`Bearer ${jwt}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteIssue = (id: any, jwt:any) => {
  return httpClient.delete(`issue/deleteissue/${id}`,{
    headers:{
      Authorization:`Bearer ${jwt}`
    }
  });
};

export const createIssue = (data: any, jwt:any) => {
  return httpClient.post("issue/createissue", data, {
    headers: {
      Authorization:`Bearer ${jwt}`,
      "Content-Type": "multipart/form-data",
    },
  });
};