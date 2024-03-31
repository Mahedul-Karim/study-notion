import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
    signUpData: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getToken(state, value) {
      state.token = value.payload;
    },
    signUpData(state,value){
        state.signUpData = value.payload;
    }
  },
});

export const { getToken,signUpData } = authSlice.actions;
export default authSlice.reducer;
