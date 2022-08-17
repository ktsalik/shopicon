import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    loggedIn: false,
    processing: false,
    username: '',
  },
  reducers: {
    login(state, action) {
      state.processing = true;
    },
    updateState(state, action) {
      state.loggedIn = action.payload.hasLoggedIn;
      state.username = action.payload.username;
      state.processing = false;
    },
    logout(state, action) {
      state.loggedIn = false;
      state.username = '';
    },
  },
});

export default accountSlice;