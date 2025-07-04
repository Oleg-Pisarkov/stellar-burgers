import Cypress from 'cypress';
import { escape } from 'querystring';

beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
    'ingredients'
  );
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
  cy.intercept('POST', '/api/orders', { fixture: 'order.json' });
  cy.intercept('POST', '/api/auth/login', { fixture: 'login.json' });
  cy.viewport(1400, 900);
  cy.visit('/');
});

describe('Добавление ингредиента в конструктор', () => {
  it('Добавление булки', () => {
    cy.get('[data-cy="test_bun"]').contains('Выберите булки').should('exist');
    cy.get('[data-cy="test_ingredient"]').contains('Добавить').click();
    cy.get('[data-cy="test_bun"]')
      .contains('Выберите булки')
      .should('not.exist');
  });

  it('Добавление начинки', () => {
    cy.get('[data-cy="test_filling"]')
      .contains('Выберите начинку')
      .should('exist');
    cy.get('[data-cy="test_ingredient"]')
      .contains('Биокотлета из марсианской Магнолии' + 'Добавить')
      .children('button')
      .click();
    cy.get('[data-cy="test_filling"]')
      .contains('Выберите начинку')
      .should('not.exist');
  });
  it('Добавление рандомного ингредиента', () => {
    cy.get('[data-cy="test_ingredient"]').then(($elements) => {
      const randomElement =
        $elements[Math.floor(Math.random() * $elements.length)];
      cy.wrap(randomElement).children('button').click();
    });
  });
});

describe('Тест работы модальных окон', () => {
  it('Открытие модального окна рандомного ингредиента', () => {
    cy.get('[data-cy="test_ingredient"]').then(($elements) => {
      const randomElement =
        $elements[Math.floor(Math.random() * $elements.length)];
      cy.wrap(randomElement).click();
    });
  });
  it('Закрытие модального окна рандомного ингредиента по клику на крестик', () => {
    cy.get('[data-cy="test_ingredient"]').then(($elements) => {
      const randomElement =
        $elements[Math.floor(Math.random() * $elements.length)];
      cy.wrap(randomElement).click();
      cy.get('[data-cy="close-modal"]').click();
    });
  });
  it('Закрытие модального окна рандомного ингредиента по клику на оверлей', () => {
    cy.get('[data-cy="test_ingredient"]').then(($elements) => {
      const randomElement =
        $elements[Math.floor(Math.random() * $elements.length)];
      cy.wrap(randomElement).click();
      cy.get('[data-cy="overlay"]').click({ force: true });
    });
  });
});

describe('Оформление заказа', () => {
  beforeEach(() => {
    window.localStorage.setItem(
      'refreshToken',
      '7b2a5c4a893d357243c8b22cf620bad9501407c43d7ed19996e86070e01f9e724469a54be7fe46e0'
    );
    window.localStorage.setItem(
      'accessToken',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NWE5NGI0OTQzZWFjMDAxY2MzYmMxNCIsImlhdCI6MTc1MTYyMTYzNCwiZXhwIjoxNzUxNjIyODM0fQ.OTTP4Re4Tpgs9LTIFVOX0gY3s0hEF2U0ipYg5JY8mzg'
    );
  });

  afterEach(() => {
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('accessToken');
  });

  describe('Проверка данных пользователя', () => {
    it('Проверка имени пользователя', () => {
      cy.get('[data-cy="profile_name"]').contains('oleg');
    });
    it('Проверка токена', () => {
      cy.wrap(window.localStorage.getItem('accessToken')).should(
        'not.be.empty'
      );

      cy.wrap(window.localStorage.getItem('refreshToken')).should(
        'not.be.empty'
      );
    });
  });

  describe('Проверка оформления заказа', () => {
    it('Проверка cборки бургера и работа кнопки "Оформить заказ", работа модального окна и отображения номера заказа ', () => {
      cy.get('[data-cy="test_ingredient"]').contains('Добавить').click();
      cy.get('[data-cy="test_ingredient"]').then(($elements) => {
        const randomElement =
          $elements[Math.floor(Math.random() * $elements.length)];
        cy.wrap(randomElement).children('button').click();
      });
      cy.get('[data-cy="button_order"]').click();
      cy.get('[data-cy="order_modal"]').contains('83557').should('be.visible');
      cy.get('[data-cy="close-modal"]').click();
      cy.get('[data-cy="order_modal"]').should('not.exist');
      cy.get('[data-cy="test_bun"]').contains('Выберите булки').should('exist');
      cy.get('[data-cy="test_filling"]')
        .contains('Выберите начинку')
        .should('exist');
    });
  });
});
