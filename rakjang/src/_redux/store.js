import { configureStore } from "@reduxjs/toolkit";

import initializeAppReducer from "./initializeAppSlice";
export default configureStore({
  reducer: {
    initializeApp: initializeAppReducer,
  },
});
