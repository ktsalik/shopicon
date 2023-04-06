import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import getCategoriesMiddleware from '../features/products-page/getCategoriesMiddleware';
import changeNavbarTypeMiddleware from '../features/navbar/changeNavbarTypeMiddleware';
import createNotificationMiddleware from '../features/notification/createNotificationMiddleware';
import productsSlice from '../features/products-page/productsSlice';
import navbarSlice from '../features/navbar/navbarSlice';
import notificationSlice from '../features/notification/notificationSlice';
import accountSlice from '../features/account/accountSlice';
import signInMiddleware from '../features/account/signinMiddleware';
import cartSlice from '../features/cart/cartSlice';
import getFeaturedProductsMiddleware from '../features/products-page/getFeaturedProductsMiddleware';
import getSliderProductsMiddleware from '../features/products-page/getSliderProductsMiddleware';
import getStatsProductsMiddleware from '../features/products-page/getStatsProductsMiddleware';

export const store = configureStore({
  reducer: combineReducers({
    navbar: navbarSlice.reducer,
    products: productsSlice.reducer,
    notification: notificationSlice.reducer,
    account: accountSlice.reducer,
    cart: cartSlice.reducer,
  }),
  middleware: [
    getCategoriesMiddleware,
    getSliderProductsMiddleware,
    getFeaturedProductsMiddleware,
    getStatsProductsMiddleware,
    changeNavbarTypeMiddleware,
    createNotificationMiddleware,
    signInMiddleware,
  ],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
