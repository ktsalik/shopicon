import { createSlice } from "@reduxjs/toolkit"

const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
    type: 'normal',
  },
  reducers: {
    loadTypePreference: (state, action) => {
      if (action.payload.loadFrom === 'localstorage') {
        const type = localStorage.getItem('navbar-type');

        if (type) {
          state.type = type;
        }
      }
    },
    changeType: (state, action) => {
      state.type = action.payload.type;

      localStorage.setItem('navbar-type', action.payload.type);
    },
  },
});

export default navbarSlice;