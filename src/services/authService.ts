import { httpClient } from "./httpClient";

export const login=(data:any)=>{
    return httpClient.post("auth/login", data)
}

export const forgotPassword=(data:any)=>{
    return httpClient.post("auth/forgotpassword", data)
}

export const resetPassword=(data:any)=>{
    return httpClient.post("auth/resetpassword", data)
}


