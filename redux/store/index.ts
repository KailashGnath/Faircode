import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "../slice/registerSlice";
import loginSlice from "../slice/loginSlice";
import transactionReducer from "../slice/transactionSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginSlice,
    transactions: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
