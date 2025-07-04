import { feedSlice, getFeeds, initialState } from './feedSlice';

const testIngredient = {
  orders: [
    {
      _id: '6867a0035a54df001b6dbbbf',
      status: 'done',
      name: 'Краторный астероидный минеральный био-марсианский бургер',
      createdAt: '2025-07-04T09:33:55.956Z',
      updatedAt: '2025-07-04T09:33:56.690Z',
      number: 83557,
      ingredients: ['643d69a5c3f7b9001cfa0941']
    }
  ],
  total: 123,
  totalToday: 123123
};

describe('Тестирование feedSlice', () => {
  const actions = {
    pending: {
      type: getFeeds.pending.type,
      payload: null
    },
    rejected: {
      type: getFeeds.rejected.type,
      error: { message: 'error' }
    },
    fulfilled: {
      type: getFeeds.fulfilled.type,
      payload: { orders: [[testIngredient]], total: 123, totalToday: 123123 }
    }
  };

  test('Тест экшена getFeeds.pending', () => {
    const state = feedSlice.reducer(initialState, actions.pending);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(actions.pending.payload);
  });
  test('Тест экшена getFeeds.rejected', () => {
    const state = feedSlice.reducer(initialState, actions.rejected);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(actions.rejected.error.message);
  });

  test('Тест экшена getFeeds.fulfilled', () => {
    const state = feedSlice.reducer(initialState, actions.fulfilled);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.orders).toEqual(actions.fulfilled.payload.orders);
    expect(state.total).toEqual(actions.fulfilled.payload.total);
    expect(state.totalToday).toEqual(actions.fulfilled.payload.totalToday);
  });
});
