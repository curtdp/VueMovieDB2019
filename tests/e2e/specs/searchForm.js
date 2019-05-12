/// <reference types="Cypress" />
describe("Форма поиска работает", () => {
  beforeEach(() => {
    cy.visit("/");
  })
  it("Подсвечивает первый элемент подсказок", () => {
    cy.get("[data-cy=searchInput]")
      .type("Месники")
      .type("{downarrow}");
    cy.get("[data-cy=searchSuggestions] > :nth-child(1)").should(
      "have.class",
      "bg-grey"
    );
  });
  it("Скрывает подсказки по нажатию Esc", () => {
    cy.get("[data-cy=searchInput]")
      .type("Месники")
      .type("{downarrow}")
      .type("{esc}");
    cy.get("[data-cy=searchSuggestions]").should("not.be.visible");
  });
  it("Переходит на страницу фильма по нажатию Enter", () => {
    cy.get("[data-cy=searchInput]")
      .type("Месники")
      .type("{downarrow}")
      .type("{enter}");
    // cy.get("[data-cy=searchSuggestions]").should("not.be.visible");
    cy.url().should('include', '/movie/')
  });
});
