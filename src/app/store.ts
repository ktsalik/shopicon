import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import getProductsMiddleware from '../features/products-page/getProductsMiddleware';
import getCategoriesMiddleware from '../features/products-page/getCategoriesMiddleware';
import productsSlice from '../features/products-page/productsSlice';

export const store = configureStore({
  reducer: combineReducers({
    products: productsSlice.reducer,
  }),
  middleware: [getProductsMiddleware, getCategoriesMiddleware]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
