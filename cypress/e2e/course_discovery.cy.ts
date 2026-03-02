export {};

describe("Course Discovery", () => {
  it("should search for courses and navigate to results", () => {
    cy.visit("/");

    const query = "Python";
    cy.get('input[placeholder="What do you want to learn?"]').type(query);

    // Check if suggestions appear
    cy.get('[role="listbox"]').should("be.visible");
    cy.get('[role="option"]').should("have.length.at.least", 1);

    // Submit search (target the form containing our input)
    cy.get('input[placeholder="What do you want to learn?"]')
      .parents("form")
      .first()
      .submit();

    // Verify navigation
    cy.url().should("include", `/search?q=${query}`);

    // Verify course results are present
    cy.contains("Results for", { matchCase: false, timeout: 10000 }).should(
      "be.visible",
    );
  });

  it("should navigate to a course details page", () => {
    cy.visit("/search?q=Python");

    // Click on the first course card title
    cy.get("h3").contains("Python", { matchCase: false }).first().click();

    // Verify redirection to course details
    cy.url().should("include", "/course/");
    cy.get("h1").should("be.visible");
  });
});
