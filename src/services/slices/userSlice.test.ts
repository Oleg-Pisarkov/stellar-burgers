import {
  getOrders,
  getUser,
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  userSlice
} from './userSlice';

const testUser = {
  user: {
    email: 'stamin169@yandex.ru',
    name: 'oleg'
  }
};

describe('Тестирование userSlice', () => {
  describe('Тест экшена getUser', () => {
    const action = {
      pending: {
        type: getUser.pending.type,
        payload: null
      },
      rejected: {
        type: getUser.rejected.type,
        error: { message: 'error' }
      },
      fulfilled: {
        type: getUser.fulfilled.type,
        payload: testUser
      }
    };

    test('Тест экшена getUser.pending', () => {
      const state = userSlice.reducer(initialState, action.pending);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(true);
    });

    test('Тест экшена getUser.rejected', () => {
      const state = userSlice.reducer(initialState, action.rejected);
      expect(state.isAuthChecked).toBe(false);
      expect(state.isAuthenticated).toBe(false);
    });

    test('Тест экшена getUser.fulfilled', () => {
      const state = userSlice.reducer(initialState, action.fulfilled);
      expect(state.isAuthChecked).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.userData).toEqual(testUser.user);
    });
  });

  describe('Тест экшена registerUser', () => {
    const action = {
      pending: {
        type: registerUser.pending.type,
        payload: null
      },
      rejected: {
        type: registerUser.rejected.type,
        error: { message: 'error' }
      },
      fulfilled: {
        type: registerUser.fulfilled.type,
        payload: testUser
      }
    };

    test('Тест экшена registerUser.pending', () => {
      const state = userSlice.reducer(initialState, action.pending);
      expect(state.request).toBe(true);
      expect(state.error).toBe(action.pending.payload);
    });

    test('Тест экшена registerUser.rejected', () => {
      const state = userSlice.reducer(initialState, action.rejected);
      expect(state.request).toBe(false);
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBe(action.rejected.error.message);
    });

    test('Тест экшена registerUser.fulfilled', () => {
      const state = userSlice.reducer(initialState, action.fulfilled);
      expect(state.request).toBe(false);
      expect(state.userData).toEqual(testUser.user);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(true);
    });
  });

  describe('Тест экшена loginUser', () => {
    const action = {
      pending: {
        type: loginUser.pending.type,
        payload: null
      },
      rejected: {
        type: loginUser.rejected.type,
        error: { message: 'error' }
      },
      fulfilled: {
        type: loginUser.fulfilled.type,
        payload: testUser
      }
    };

    test('Тест экшена loginUser.pending', () => {
      const state = userSlice.reducer(initialState, action.pending);
      expect(state.request).toBe(true);
    });

    test('Тест экшена loginUser.rejected', () => {
      const state = userSlice.reducer(initialState, action.rejected);
      expect(state.request).toBe(false);
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBe(action.rejected.error.message);
    });

    test('Тест экшена loginUser.fulfilled', () => {
      const state = userSlice.reducer(initialState, action.fulfilled);
      expect(state.request).toBe(false);
      expect(state.userData).toEqual(testUser.user);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(true);
    });
  });

  describe('Тест экшена getOrders', () => {
    const action = {
      pending: {
        type: getOrders.pending.type,
        payload: null
      },
      rejected: {
        type: getOrders.rejected.type,
        error: { message: 'error' }
      },
      fulfilled: {
        type: getOrders.fulfilled.type,
        payload: ['order', 'order']
      }
    };

    test('Тест экшена getOrders.pending', () => {
      const state = userSlice.reducer(initialState, action.pending);
      expect(state.request).toBe(true);
    });

    test('Тест экшена getOrders.rejected', () => {
      const state = userSlice.reducer(initialState, action.rejected);
      expect(state.request).toBe(false);
      expect(state.error).toBe(action.rejected.error.message);
    });

    test('Тест экшена getOrders.fulfilled', () => {
      const state = userSlice.reducer(initialState, action.fulfilled);
      expect(state.request).toBe(false);
      expect(state.userOrders).toEqual(action.fulfilled.payload);
    });
  });

  describe('Тест экшена logoutUser', () => {
    const action = {
      pending: {
        type: logoutUser.pending.type,
        payload: null
      },
      rejected: {
        type: logoutUser.rejected.type,
        error: { message: 'error' }
      },
      fulfilled: {
        type: logoutUser.fulfilled.type,
        payload: null
      }
    };

    test('Тест экшена logoutUser.pending', () => {
      const state = userSlice.reducer(initialState, action.pending);
      expect(state.request).toBe(true);
    });

    test('Тест экшена logoutUser.rejected', () => {
      const state = userSlice.reducer(initialState, action.rejected);
      expect(state.request).toBe(false);
      expect(state.error).toBe(action.rejected.error.message);
    });

    test('Тест экшена logoutUser.fulfilled', () => {
      const state = userSlice.reducer(initialState, action.fulfilled);
      expect(state.request).toBe(false);
      expect(state.userData).toBe(null);
      expect(state.isAuthChecked).toBe(false);
      expect(state.isAuthenticated).toBe(false);
    });
  });
});
