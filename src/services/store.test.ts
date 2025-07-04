import store, { rootReducer } from '../services/store';

describe('Smoke тесты для rootReducer', () => {

  test('Проверка инициализации rootReducer', () => {
    // Проверяем, что rootReducer возвращает корректное начальное состояние
    const initialState = rootReducer(undefined, { type: '@@redux/INIT' });
    expect(initialState).toEqual(store.getState());
  });

  test('Проверка обработки неизвестного действия', () => {
    // Проверяем, что неизвестное действие не меняет состояние
    const state = rootReducer(store.getState(), { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(store.getState());
  });

  test('Проверка структуры состояния', () => {
    // Проверяем наличие всех ожидаемых слайсов в состоянии
    expect(store.getState()).toHaveProperty('BurgerConstructor');
    expect(store.getState()).toHaveProperty('feed');
    expect(store.getState()).toHaveProperty('ingredient');
    expect(store.getState()).toHaveProperty('order');
    expect(store.getState()).toHaveProperty('userSlice');
  });

  test('Проверка базового состояния каждого слайса', () => {
    const state = store.getState();
    
    // Проверяем, что каждый слайс имеет корректное начальное состояние
    expect(state.BurgerConstructor).toBeDefined();
    expect(state.feed).toBeDefined();
    expect(state.ingredient).toBeDefined();
    expect(state.order).toBeDefined();
    expect(state.userSlice).toBeDefined();
  });
});
