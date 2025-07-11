import { getOrderByNumberApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  order: TOrder[];
  orderByNumber: TOrder | null;
  orderResponse: TOrder | null;
  orderRequest: boolean;
  error: string | null;
};

export const initialState: TOrderState = {
  order: [],
  orderByNumber: null,
  orderResponse: null,
  orderRequest: false,
  error: null
};

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

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
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderByNumber = action.payload.orders[0];
        state.orderRequest = false;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message as string;
      });
  }
});

export const { getOrderState } = orderSlice.selectors;
export default orderSlice.reducer;
