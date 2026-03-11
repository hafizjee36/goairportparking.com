import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import searchSlice from "./slice/searchSlice";
import paymentReducer from "./slice/paymentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchSlice,
    payment: paymentReducer,
  },
});
