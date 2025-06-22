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
  userOrders: TOrder[] | null;
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
        state.userData = null;
        state.isAuthChecked = false;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
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
        state.isAuthChecked = false;
        state.isAuthenticated = true;
        state.userData = {
          ...action.payload.user
        };
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.userOrders = null;
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

/*

type TUserState = {
  user: TUser | null;
  password: string;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  userOrders: TOrder[] | null;
};

export const initialState: TUserState = {
  user:  null,
  password: '', 
  isAuthChecked: false,
  isAuthenticated: false,
  isLoading: false,
  userOrders: [],
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
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          email: action.payload.user.email,
          name: action.payload.user.name
        };
        state.isAuthChecked = true;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          email: action.payload.user.email,
          name: action.payload.user.name
        };
        state.isAuthChecked = true;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = {
          email: '',
          name: ''
        };
        state.isAuthChecked = true;
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      })
      .addCase(getUser.pending, (state, action) => {
        state.isLoading = true;
        state.isAuthChecked = false;
        
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          email: action.payload.user.email,
          name: action.payload.user.name
        };
        state.isAuthChecked = true;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          email: action.payload.user.email,
          name: action.payload.user.name
        };
      });
  }
});

export const { getUserState } = userSlice.selectors;
export default userSlice.reducer;
*/
