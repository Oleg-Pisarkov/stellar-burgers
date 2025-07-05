import {
  addIngredient,
  constructorSlice,
  TConstructorSlice
} from './constructorSlice';
import { expect, describe, test } from '@jest/globals';

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

describe('Тестирование constructorSlice', () => {
  let state: TConstructorSlice;
  beforeEach(() => {
    state = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      loading: false,
      orderRequest: false,
      error: null,
      orderModalData: null
    };
  });

  test('Тестирование экшена добавления ингредиента', () => {
    const addAction = addIngredient(testIngredient);
    state = constructorSlice.reducer(state, addAction);
    expect(state.constructorItems.ingredients[0]).toMatchObject({
      ...testIngredient,
      id: expect.any(String)
    });
  });

  test('Тестирование экшена удаления ингредиента', () => {
    const addAction = addIngredient(testIngredient);
    state = constructorSlice.reducer(state, addAction);
    const deleteAction = constructorSlice.actions.removeIngredient(
      testIngredient._id
    );
    state = constructorSlice.reducer(state, deleteAction);
    expect(state.constructorItems.ingredients.length).toBe(0);
  });

  test('Тестирование экшена перемещения ингредиента вверх', () => {
    const addAction = addIngredient(testIngredient);
    state = constructorSlice.reducer(state, addAction);
    const moveAction = constructorSlice.actions.MoveUp(0);
    state = constructorSlice.reducer(state, moveAction);
    expect(state.constructorItems.ingredients[0]).toMatchObject({
      ...testIngredient,
      id: expect.any(String)
    });
  });
});
