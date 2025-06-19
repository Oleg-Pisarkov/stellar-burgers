import { orderBurgerApi } from "@api";
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { TIngredient, TOrder } from "@utils-types"


export type TConstructorSlice = {
  bun: TIngredient | null,
  ingredients: TIngredient[]
  loading: boolean,
  request: boolean,
  error: string | null,
  modal: TOrder | null,
}

export const initialState: TConstructorSlice = {
  bun: null,
  ingredients: [],
  loading: false,
  request: false,
  error: null,
  modal: null,
};

export const orderBurger = createAsyncThunk('constructor/orderBurger', async (data: string[]) => await orderBurgerApi(data));

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients = [...state.ingredients, action.payload];
      }
    },
    getId: (ingredient) => {
      const id = nanoid();
      return { ...ingredient, id }
     //return { payload: { ...ingredient, id } }
    },
    removeIngredient: (state, action) => {
     state.ingredients = state.ingredients.filter(ingredient => ingredient._id !== action.payload);
    },
    counterIngredientUp: (state, action) => {
      state.ingredients.splice(action.payload, 0, state.ingredients.splice(action.payload - 1, 1)[0]);
    },
    counterIngredientDown: (state, action) => {
      state.ingredients.splice(action.payload - 1, 0, state.ingredients.splice(action.payload, 1)[0]);
    },
    setRequest: (state, action) => {
      state.request = action.payload;
    },
    
    resetModal: (state) => {
      state.modal = null;
    }
  },
  selectors: {
    getConstructorState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.request = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.request = false;
        state.error = null;
        state.modal = action.payload.order;
        state.bun = null;
        state.ingredients = [];
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.request = false;
      });
  }
});

export const { addIngredient, removeIngredient, counterIngredientUp, counterIngredientDown, setRequest, resetModal } = constructorSlice.actions;
export const { getConstructorState } = constructorSlice.selectors;
export default constructorSlice.reducer;
