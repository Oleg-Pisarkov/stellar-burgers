import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { constructorSlice } from './slices/constructorSlice';
import { feedSlice } from './slices/feedSlice';
import { ingredientSlice } from './slices/ingredientSlice';
import { orderSlice } from './slices/orderSlice';
import { userSlice } from './slices/userSlice';

export const rootReducer = combineReducers({
  BurgerConstructor: constructorSlice.reducer,
  feed: feedSlice.reducer,
  ingredient: ingredientSlice.reducer,
  order: orderSlice.reducer,
  userSlice: userSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
