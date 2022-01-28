import { LOG_OUT, SET_USER } from "./consts";

export const loginAction = (data:any) => (dispatch:any) => {
    if(!data.rememberMe){
        let currentDate = new Date()
        let futureDate = new Date(currentDate.getTime() + 120 * 60000).toISOString();
        data.expiryDate = futureDate;
    }

    dispatch({
        type: SET_USER,
        payload: data,
      });
};

export const logOutAction = () => (dispatch:any) => {
  dispatch({
    type: LOG_OUT,
  });
};