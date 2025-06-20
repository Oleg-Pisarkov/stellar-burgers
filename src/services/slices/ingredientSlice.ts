import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export type TIngredientState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initialState: TIngredientState = {
  ingredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredient/getIngredients',
  async () => await getIngredientsApi()
);

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsState: (state: TIngredientState) => state
  },
  extraReducers: (builder) => {
    builder
      /*
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
        */
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  }
});

export const { getIngredientsState } = ingredientSlice.selectors;
export default ingredientSlice.reducer;
