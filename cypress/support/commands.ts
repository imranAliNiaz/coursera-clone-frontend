export {};

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/");
  cy.contains("button", "Log In").first().click();

  // Step 1: Email
  cy.get("#email", { timeout: 10000 }).should("be.visible").type(email);
  cy.contains("button", "Continue").click();

  // Step 2: Password
  cy.get("#password", { timeout: 10000 }).should("be.visible").type(password);
  cy.get('button[type="submit"]').contains("Login").click();

  // Ensure we are redirecting
  cy.url().should("include", "/dashboard");
});

Cypress.Commands.add("register", (name, email, password) => {
  cy.visit("/");
  cy.contains("button", "Join for Free").first().click();

  cy.get("#name").should("be.visible").type(name);
  cy.get("#signup-email").should("be.visible").type(email);
  cy.get("#signup-password").should("be.visible").type(password);

  cy.get('button[type="submit"]').contains("Create Account").click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<Element>;
      register(
        name: string,
        email: string,
        password: string,
      ): Chainable<Element>;
    }
  }
}
