import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderType } from "../../types";

export interface OrderState {
  value: OrderType[];
}

const initialState: OrderState = {
  value: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<OrderType>) => {
      state.value = [...state.value, action.payload];
    },
  },
});

export const { addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
