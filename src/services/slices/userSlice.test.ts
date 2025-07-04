import { getUser, initialState, userSlice } from './userSlice';

const testUser = {
  user: {
    email: 'stamin169@yandex.ru',
    name: 'oleg'
  }
};

describe('Тестирование userSlice', () => {
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
