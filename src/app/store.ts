import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import getProductsMiddleware from '../features/products-page/getProductsMiddleware';
import getCategoriesMiddleware from '../features/products-page/getCategoriesMiddleware';
import changeNavbarTypeMiddleware from '../features/navbar/changeNavbarTypeMiddleware';
import createNotificationMiddleware from '../features/notification/createNotificationMiddleware';
import productsSlice from '../features/products-page/productsSlice';
import navbarSlice from '../features/navbar/navbarSlice';
import notificationSlice from '../features/notification/notificationSlice';

export const store = configureStore({
  reducer: combineReducers({
    navbar: navbarSlice.reducer,
    products: productsSlice.reducer,
    notification: notificationSlice.reducer,
  }),
  middleware: [getProductsMiddleware, getCategoriesMiddleware, changeNavbarTypeMiddleware, createNotificationMiddleware]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
