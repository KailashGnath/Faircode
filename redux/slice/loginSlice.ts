import tokenHandlers from "@/utils/tokenHandlers";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Keys = "email" | "password" | "isLoggedIn";

const initialState: Record<Keys, boolean | string> = {
  email: "",
  password: "",
  isLoggedIn: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Record<Keys, boolean | string>>) => {
      tokenHandlers.setTokens({ accessToken: action.payload.email as string });
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      tokenHandlers.clearTokens();
      return state;
    },
  },
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
