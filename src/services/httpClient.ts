import Axios from "axios";

const api:any = Axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json, multipart/form-data",
  },
});

class HttpClient {
  get(url:any, configs:any=null) {
    return api.get(url, configs);
  }

  post(url:any, data:any, configs:any=null) {
    return api.post(url, data, configs);
  }

  put(url:any, data:any=null, configs:any=null) {
    return api.put(url, data, configs);
  }

  delete(url:any, config:any=null) {
    return api.delete(url, config);
  }
}

export const httpClient = new HttpClient();