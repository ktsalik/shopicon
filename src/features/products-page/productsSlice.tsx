import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    categories: [],
    sliderProducts: [],
    featuredProducts: [],
    statsProducts: {
      newArrival: [],
      bestSeller: [],
      sale: [],
    },
  },
  reducers: {
    getCategories(state, action) {
      state.categories = action.payload;
    },
    getSliderProducts(state, action) {
      state.sliderProducts = action.payload;
    },
    getFeaturedProducts(state, action) {
      state.featuredProducts = action.payload;
    },
    getStatsProducts(state, action) {
      state.statsProducts = action.payload;
    },
  },
});

export default productsSlice;