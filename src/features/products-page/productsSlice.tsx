import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    productListItems: [],
    productListPageCount: 0,
    loadingProducts: false,
    categories: [],
  },
  reducers: {
    getProducts(state, action) {
      state.loadingProducts = true;
    },
    productsLoaded: (state, action) => {
      state.productListItems = action.payload.products;
      state.productListPageCount = action.payload.page_count;
      state.loadingProducts = false;
    },
    getCategories(state, action) {

    },
    categoriesLoaded: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export default productsSlice;