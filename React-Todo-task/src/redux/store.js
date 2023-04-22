import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import taskReducer from "./reducer";

export const store = createStore(taskReducer, composeWithDevTools());
