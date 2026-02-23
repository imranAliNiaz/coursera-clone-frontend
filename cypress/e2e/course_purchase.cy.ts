export {};

describe("Course Purchase Flow", () => {
  const testUser = {
    email: "bilal@gmail.com",
    password: "123456",
  };

  beforeEach(() => {
    // Start from a logged-in state for purchase flow
    cy.login(testUser.email, testUser.password);
  });

  it("should complete the full flow from discovery to checkout", () => {
    cy.visit("/");

    // Search for a course
    const searchQuery = "React";
    cy.get('input[placeholder*="want to learn"]').type(`${searchQuery}{enter}`);

    // Select first course result
    cy.get("h3").contains(searchQuery, { matchCase: false }).first().click();

    // On Course Details page - Enroll/Purchase
    cy.contains("button", /Enroll|Go to Course/i).click();

    // Verify navigation to checkout or summary
    cy.url().should("match", /\/(checkout|course-content|payment)/);

    if (Cypress.config().baseUrl === "http://localhost:5173") {
      cy.log("Verification of checkout UI components");
      // Check for common checkout elements
      cy.contains(/Order Summary|Secure Checkout/i).should("be.visible");
    }
  });
});
