import { orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export type TConstructorSlice = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  loading: boolean;
  orderRequest: boolean;
  error: string | null;
  orderModalData: TOrder | null;
};

export const initialState: TConstructorSlice = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  loading: false,
  orderRequest: false,
  error: null,
  orderModalData: null
};

export const orderBurger = createAsyncThunk(
  'constructor/orderBurger',
  async (data: string[]) => orderBurgerApi(data)
);

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients = [
          ...state.constructorItems.ingredients,
          action.payload
        ];
      }
    },
    getId: (ingredient) => {
      const id = nanoid();
      return { ...ingredient, id };
      //return { payload: { ...ingredient, id } }
    },
    removeIngredient: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient._id !== action.payload
        );
    },
    MoveUp: (state, action: PayloadAction<number>) => {
      state.constructorItems.ingredients.splice(
        action.payload,
        0,
        state.constructorItems.ingredients.splice(action.payload - 1, 1)[0]
      );
    },
    MoveDown: (state, action: PayloadAction<number>) => {
      state.constructorItems.ingredients.splice(
        action.payload - 1,
        0,
        state.constructorItems.ingredients.splice(action.payload, 1)[0]
      );
    },
    setRequest: (state, action) => {
      state.orderRequest = action.payload;
    },

    resetModal: (state) => {
      state.orderModalData = null;
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
        state.orderRequest = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.error = null;
        state.orderModalData = action.payload.order;
        state.constructorItems.bun = null;
        state.constructorItems.ingredients = [];
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
        state.orderRequest = false;
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  MoveUp,
  MoveDown,
  setRequest,
  resetModal
} = constructorSlice.actions;
export const { getConstructorState } = constructorSlice.selectors;
export default constructorSlice.reducer;
