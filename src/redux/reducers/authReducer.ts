import { LOG_OUT, SET_USER } from "../actions/consts";

const initialState = {
  username: null,
  isLoggedIn: false,
  jwt: null,
  jwtExpiryDate: null,
  rememberMe: false,
  name: null,
  surname: null,
  roles: null,
};

const authReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        username: action.payload.username,
        name: action.payload.name,
        surname: action.payload.surname,
        isLoggedIn: true,
        jwt: action.payload.jwt,
        roles: action.payload.roles,
        jwtExpiryDate: action.payload.expiryDate,
        rememberMe: action.payload.rememberMe,
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;