import { createStore, applyMiddleware } from "redux";
import devToolsEnhancer from 'remote-redux-devtools';
import rootReducer from "./rootReducer";

const store = createStore(rootReducer, devToolsEnhancer({suppressConnectErrors:false}));

export default store;
