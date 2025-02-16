import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Keys = "name" | "email" | "password";

export interface RegisterState {
  value: Record<Keys, string>;
}

const initialState: Record<Keys, string> = {
  email: "",
  name: "",
  password: "",
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<Record<Keys, string>>) => {
      state = { ...state, ...action.payload };
      return state;
    },
  },
});

export const { register } = registerSlice.actions;

export default registerSlice.reducer;
