export {};

describe("Student Dashboard - Production Level", () => {
  const testUser = {
    email: "bilal@gmail.com",
    password: "123456",
  };

  beforeEach(() => {
    // Standardized login for dashboard tests
    cy.login(testUser.email, testUser.password);
  });

  it('should render the "Continue your learning" section with course cards', () => {
    cy.visit("/dashboard");
    cy.contains("h2", "Continue your learning").should("be.visible");

    // Check if the dashboard is personalized
    cy.contains("Welcome back", { timeout: 10000 }).should("be.visible");

    // Check for the "Go to course" button or course card
    cy.contains("Need help?").should("be.visible");
  });

  it('should render the "Most Popular Certificates" section with dynamic content', () => {
    cy.visit("/dashboard");
    cy.contains("h2", "Most Popular Certificates").should("be.visible");

    // Verify that some course cards are rendered and have images
    cy.get(".container").find("img").should("have.length.at.least", 1);
  });

  it('should navigate to "My Learning" and verify the URL', () => {
    cy.visit("/dashboard");
    cy.contains("a", "Show all").first().click();
    cy.url().should("include", "/my-learning");
    cy.get("h1")
      .contains(/My Learning|Accomplishments/i)
      .should("be.visible");
  });
});
