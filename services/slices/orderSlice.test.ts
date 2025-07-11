import { getOrderByNumber, initialState, orderSlice } from './orderSlice';

const testIngredient = {
  orders: {
    _id: '6867a0035a54df001b6dbbbf',
    status: 'done',
    name: 'Краторный астероидный минеральный био-марсианский бургер',
    createdAt: '2025-07-04T09:33:55.956Z',
    updatedAt: '2025-07-04T09:33:56.690Z',
    number: 83557,
    ingredients: ['643d69a5c3f7b9001cfa0941']
  }
};

describe('Тестирование orderSlice', () => {
  const action = {
    pending: {
      type: getOrderByNumber.pending.type,
      payload: null
    },
    rejected: {
      type: getOrderByNumber.rejected.type,
      error: { message: 'error' }
    },
    fulfilled: {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: [testIngredient] }
    }
  };

  test('Тест экшена getOrderByNumber.pending', () => {
    const state = orderSlice.reducer(initialState, action.pending);
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBe(action.pending.payload);
  });

  test('Тест экшена getOrderByNumber.rejected', () => {
    const state = orderSlice.reducer(initialState, action.rejected);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe(action.rejected.error.message);
  });

  test('Тест экшена getOrderByNumber.fulfilled', () => {
    const state = orderSlice.reducer(initialState, action.fulfilled);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe(null);
    expect(state.orderByNumber).toBe(action.fulfilled.payload.orders[0]);
  });
});
