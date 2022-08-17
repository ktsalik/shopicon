import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
  },
  reducers: {
    add(state: any, action: any) {
      const p = [...state.products];
      const indexOfProductInCart = p.findIndex((product) => product.id === action.payload.id);
      if (indexOfProductInCart > -1) {
        p[indexOfProductInCart].quantity++;
      } else {
        p.push({
          ...action.payload,
          quantity: 1,
        });
      }
      state.products = p;
    },
    remove(state: any, action: any) {
      const p = [...state.products];
      const indexOfProductInCart = p.findIndex((product) => product.id === action.payload.id);
      if (indexOfProductInCart > -1) {
        p.splice(indexOfProductInCart, 1);
      }
      state.products = p;
    }
  },
});

export default cartSlice;