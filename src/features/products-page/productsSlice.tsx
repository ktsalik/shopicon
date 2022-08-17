import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    loadingCategories: false,
    categories: [],
  },
  reducers: {
    getCategories(state, action) {
      state.loadingCategories = true;
    },
    categoriesLoaded: (state, action) => {
      state.loadingCategories = false;
      state.categories = action.payload;
    },
  },
});

export default productsSlice;