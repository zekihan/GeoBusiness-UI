import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import businessReducer from "./business/businessReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  business: businessReducer
});

export default rootReducer;
