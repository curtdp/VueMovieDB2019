// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    // подготовка
    // действие
    cy.visit('/')
    // сравнение
    cy.contains('h1', 'Найпопулярніші кінострічки')
  })
})