import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import cartReducer from "./cart/cartSlice";
export const store = configureStore({
  reducer: {
    user: userReducer, // whereever i am using state.user i am refring to userReducer frim here i am connecting store to it
    cart: cartReducer
  },
});
