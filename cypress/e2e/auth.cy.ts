export {};

describe("Authentication Flow - Production Level", () => {
  const testUser = {
    name: "E2E Production User",
    email: `prod_e2e_${Date.now()}@example.com`,
    password: "Password123!",
  };

  it("should navigate through the registration flow successfully", () => {
    cy.register(testUser.name, testUser.email, testUser.password);

    // Registration success message (toast)
    cy.contains("Account created successfully", { timeout: 15000 }).should(
      "be.visible",
    );

    // Modal should transition to login
    cy.get("h2")
      .contains(/Log in|Welcome back/i)
      .should("be.visible");
  });

  it("should handle login with newly registered credentials", () => {
    cy.login(testUser.email, testUser.password);

    // Verify redirection to dashboard
    cy.url().should("include", "/dashboard");
    cy.contains(testUser.name).should("be.visible");
  });

  it("should show specialized error for invalid credentials", () => {
    cy.visit("/");
    cy.contains("button", "Log In").first().click();

    cy.get("#email").should("be.visible").type("invalid.user@example.com");
    cy.contains("button", "Continue").click();

    cy.get("#password").should("be.visible").type("WrongPass123");
    cy.get('button[type="submit"]').contains("Login").click();

    // Verify correct error response from backend (previously fixed 401)
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("should validate required fields during registration", () => {
    cy.visit("/");
    cy.contains("button", "Join for Free").first().click();

    // The button should be disabled when the form is empty
    cy.get('button[type="submit"]')
      .contains("Create Account")
      .should("be.disabled");

    // Fill one field and check still disabled (if that's the logic)
    cy.get("#name").type(testUser.name);
    cy.get('button[type="submit"]').should("be.disabled");
  });
});
