import { createSlice } from "@reduxjs/toolkit";
import {userRequest} from "../../requestMethods";

const user =  await JSON.parse(localStorage.getItem('user')) || null;

let response = null;
if(user){
  response =  await userRequest.get(`/cart/single/${user._id}`);
  console.log("response from cart ", response.data);
}


const initialState = {
  loading: false,
  success: undefined,
  error: undefined,
  products: response ? response.data.products : [],
  quantity: response ? response.data.quantity : 0,
  totalPrice: response ? response.data.totalPrice : 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    requestCart: (state) => {
      state.loading = true;
    },
    cartSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.products= action.payload.products;
      state.quantity = action.payload.quantity;
      state.totalPrice = action.payload.totalPrice;
    },
    cartError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { requestCart, cartSuccess, cartError } = cartSlice.actions;

export default cartSlice.reducer;
