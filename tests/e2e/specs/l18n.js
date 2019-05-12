/// <reference types="Cypress" />
describe("Интернационализация", () => {
  it("Включает английскую локализацию", () => {
    cy.visit("/");
    cy.get("select").select("English");
    cy.get("[data-cy=siteName]").contains("Movie DB");
  });
});
