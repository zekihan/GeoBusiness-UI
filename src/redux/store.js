import { createStore, applyMiddleware } from "redux";
import devToolsEnhancer from 'remote-redux-devtools';
import rootReducer from "./rootReducer";

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    // applyMiddleware(...middleware),
    // other store enhancers if any
);
const store = createStore(rootReducer, enhancer);
export default store;