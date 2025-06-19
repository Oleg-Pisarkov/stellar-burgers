import { getOrderByNumberApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types"


type TOrderState = {
  order: TOrder[],
  orderByNumber: TOrder | null,
  orderResponse: TOrder | null,
  orderRequest: boolean,
};

export const initialState: TOrderState = {
  order:[],
  orderByNumber: null,
  orderResponse: null,
  orderRequest: false,
};

export const getOrderByNumber = createAsyncThunk('order/getOrderByNumber', async (number: number) => await getOrderByNumberApi(number));

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrderState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderByNumber = action.payload.orders[0];
        state.orderRequest = false;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.orderRequest = false;
      });
  },
});
