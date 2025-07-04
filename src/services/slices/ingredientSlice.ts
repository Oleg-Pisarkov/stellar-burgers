import { getIngredientsApi } from '../../utils/burger-api';
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
  async () => getIngredientsApi()
);

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state: TIngredientState) => state.ingredients,
    selectLoading: (state: TIngredientState) => state.loading,
    selectError: (state: TIngredientState) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.ingredients = action.payload;
      });
  }
});

export const { selectIngredients, selectLoading, selectError } =
  ingredientSlice.selectors;
export default ingredientSlice.reducer;
