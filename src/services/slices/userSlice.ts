import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  userData: TUser | null;
  password: string;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  registerData: TRegisterData | null;
  userOrders: TOrder[];
  success: boolean;
};

export const initialState: TUserState = {
  userData: null,
  password: '',
  isAuthChecked: false,
  isAuthenticated: false,
  registerData: null,
  userOrders: [],
  success: false
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (registerData: TRegisterData) => await registerUserApi(registerData)
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const getOrders = createAsyncThunk('user/getOrders', getOrdersApi);

export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  logoutApi().then(() => {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
  });
});

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    userLogout: (state) => ({
      ...state,
      user: null,
      password: ''
    })
  },
  selectors: {
    getUserState: (state) => state
  },
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthChecked = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        console.log(state.isAuthChecked);
        console.log(state.isAuthenticated);
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.userData = action.payload.user;
      })
      .addCase(getUser.pending, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.success = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.isAuthenticated = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.userData = {
          ...action.payload.user
        };
      })
      .addCase(getOrders.pending, (state, action) => {
        console.log(state.isAuthChecked);
        console.log(state.isAuthenticated);
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.success = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isAuthChecked = false;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthChecked = false;
        state.isAuthenticated = false;
        state.userData = null;
      });
  }
});

export const { userLogout } = userSlice.actions;
export const { getUserState } = userSlice.selectors;
export default userSlice.reducer;
