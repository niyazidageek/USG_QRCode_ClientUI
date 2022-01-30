import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";
import customizationReducer from "./customizationReducer";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["authReducer"],
  };
  

  const rootReducer = combineReducers({
    authReducer,
    customizationReducer
  });


  export default persistReducer(persistConfig, rootReducer);