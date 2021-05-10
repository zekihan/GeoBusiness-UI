import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import businessReducer from "./business/businessReducer";
import chatReducer from "./chat/chatReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  business: businessReducer,
  chat: chatReducer
});

export default rootReducer;
