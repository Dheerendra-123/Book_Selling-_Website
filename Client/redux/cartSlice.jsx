// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // full book objects
  },
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { setCartItems, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
