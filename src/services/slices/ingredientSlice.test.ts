import { getIngredients, ingredientSlice } from './ingredientSlice';
import { initialState } from './ingredientSlice';

const testIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

describe('Тестирование  ingredientSlice', () => {
  const action = {
    pending: {
      type: getIngredients.pending.type,
      payload: null
    },
    rejected: {
      type: getIngredients.rejected.type,
      error: { message: 'error' }
    },
    fulfilled: {
      type: getIngredients.fulfilled.type,
      payload: [testIngredient]
    }
  };
  test('Тест экшена getIngredients.pending', () => {
    const state = ingredientSlice.reducer(initialState, action.pending);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(action.pending.payload);
  });

  test('Тест экшена getIngredients.rejected', () => {
    const state = ingredientSlice.reducer(initialState, action.rejected);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(action.rejected.error.message);
  });

  test('Тест экшена getIngredients.fulfilled', () => {
    const state = ingredientSlice.reducer(initialState, action.fulfilled);
    expect(state.loading).toBe(false);
    expect(state.ingredients).toBe(action.fulfilled.payload);
  });
});
