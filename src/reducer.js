import { createSlice } from "@reduxjs/toolkit";

export const loginFlag = createSlice({
  name: "login",
  initialState: {
    value: false,
  },
  reducers: {
    login: (state, { payload }) => {
      state.value = payload;
    }
  },
});

export const { login } = loginFlag.actions;

export default loginFlag.reducer;
