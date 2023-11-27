import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";

import { apiSlice } from "./slices/apiSlice.js";

const rootReducer = combineReducers({
  auth: authReducer,

  [apiSlice.reducerPath]: apiSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;

