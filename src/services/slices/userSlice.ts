import { getOrdersApi, getUserApi, loginUserApi, logoutApi, registerUserApi, TLoginData, TRegisterData, updateUserApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrder, TUser } from "@utils-types";
import { deleteCookie, setCookie } from "src/utils/cookie";

type TUserState = {
user: TUser | null;
password: string;
isAuthChecked: boolean; 
isAuthenticated: boolean;
registerData: TRegisterData | null;
userOrders: TOrder[] | null;
};


export const initialState: TUserState = { 
  user: null, 
  password: '', 
  isAuthChecked: false, 
  isAuthenticated: false,
  registerData: null, 
  userOrders: [], 
};

export const registerUser = createAsyncThunk('user/registerUser', 
  async (data: TRegisterData) => await registerUserApi(data));

export  const loginUser = createAsyncThunk('user/loginUser', 
  async ({email, password}: TLoginData) => {
    const data = await loginUserApi({email, password});
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
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
    return {
      ...state,
      user: null,
      password: ''
    };
  }
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
     state.user = null;
     state.isAuthChecked = false;
     state.isAuthenticated = false;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
     state.user = action.payload.user;
     state.isAuthChecked = false;
     state.isAuthenticated = true;
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
      state.isAuthChecked = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    })
    .addCase(getUser.pending, (state) => {
      state.isAuthChecked = true;
      state.isAuthenticated = true;
    })
     .addCase(getUser.rejected, (state, action) => {
      state.isAuthChecked = false;
      state.isAuthenticated = false;
    })

     .addCase(getUser.fulfilled, (state, action) => {
      state.isAuthChecked = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    })
    .addCase(getOrders.fulfilled, (state, action) => {
      state.userOrders = action.payload;
    })
    .addCase(getOrders.rejected, (state, action) => {
      state.userOrders = null;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
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
      state.user = null;
    })
},
});

export const { userLogout } = userSlice.actions;
export const { getUserState } = userSlice.selectors;
export default userSlice.reducer;
