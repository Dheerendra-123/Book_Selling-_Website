// import { createSlice } from "@reduxjs/toolkit";

// const wishListSlice=createSlice({
//   name:'wishlist',
//   initialState:{
//     items:[],
//   },
//   reducers:{
//     setWishList:(state,action)=>{
//       state.items-action.payload;
//     },
//       removeFromWishList: (state, action) => {
//       state.items = state.items.filter(item => item._id !== action.payload);
//     },
//     clearWishList: (state) => {
//       state.items = [];
//     }
//   }
// })

// export const { setWishList, removeFromWishList, clearWishList } = wishListSlice.actions;
// export default wishListSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
  },
  reducers: {
    setWishList: (state, action) => {
      state.items = action.payload;
    },
    addToWishList: (state, action) => {
      state.items.push(action.payload); // Optional: check for duplicates
    },
    removeFromWishList: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    clearWishList: (state) => {
      state.items = [];
    },
  },
});

export const { setWishList, addToWishList, removeFromWishList, clearWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
