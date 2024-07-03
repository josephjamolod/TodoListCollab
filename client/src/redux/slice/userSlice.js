import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  latest: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUserStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    signInUserSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    signInUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerUserStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    registerUserSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    registerUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutUserStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    signOutUserSuccess: (state) => {
      state.loading = initialState.loading;
      state.error = initialState.error;
      state.currentUser = initialState.currentUser;
    },
    signOutUserFail: (state) => {
      state.loading = false;
    },
    toggleCheck: (state, action) => {
      state.latest = action.payload;
    },
  },
});

export const {
  signInUserStart,
  signInUserSuccess,
  signInUserFail,
  registerUserStart,
  registerUserSuccess,
  registerUserFail,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFail,
  toggleCheck,
} = userSlice.actions;

export default userSlice.reducer;
