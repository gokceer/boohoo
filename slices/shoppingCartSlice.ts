import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from '../store'
import type { CommonProductObjectType } from "../App"

type initialStateType = {
  items: CommonProductObjectType[]
}

const initialState: initialStateType = {
  items: [],
};

export const shoppingCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
        
      let tempCart = [...state.items];
        
      index >= 0
        ? tempCart.splice(index, 1)
        : console.warn(`Cannot remove id: ${action.payload.id}`);
        
      state.items = tempCart;
    },
    removeAllFromCartWithId: (state, action) => {
      const filteredState = state.items.filter((item) => {
        return item.id !== action.payload.id
      })
      state.items = [...filteredState]
    },
  }
});
  
  export const { addToCart, removeFromCart, removeAllFromCartWithId } = shoppingCartSlice.actions;
  
  export const selectCartItems = (state: RootState) => state.cart.items;
  
  export const selectCartItemsWithId = (state: RootState, id: number) =>
  state.cart.items.filter((item) => item.id === id);
  
  export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((total, item) => (total += item.price), 0);
  
  export default shoppingCartSlice.reducer;
