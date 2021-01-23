import { combineReducers } from "redux";
import businessReducer from "./business/businessReducer";

const rootReducer = combineReducers({
  business: businessReducer
});

export default rootReducer;
