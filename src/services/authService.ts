import { httpClient } from "./httpClient";

export const login=(data:any)=>{
    return httpClient.post("auth/login", data)
}
