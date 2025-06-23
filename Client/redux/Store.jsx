// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishListReducer from './wishListSlice'
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist:wishListReducer,
  },
});
