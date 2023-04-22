import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../reducers/FormData";

export default configureStore({
  reducer: {
    data: formReducer,
  },
});
