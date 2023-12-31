describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");
    cy.findByRole("heading", { name: /My Records/i }).should("exist");
    cy.findByAltText(/add new Off/i).click();

    cy.findByLabelText(/Band name:/i).type("Ramu el jefe");
    cy.findByLabelText(/Record name:/i).type("La banda trapera de Ramu");
    cy.findByLabelText(/front cover image:/i).type(
      "https://www.dirtyrock.info/wp-content/uploads/ngg_featured/la-banda-trapera-del-rio-dirty-rock-1.jpg",
    );
    cy.findByLabelText(/back cover image:/i).type(
      "https://www.dirtyrock.info/wp-content/uploads/ngg_featured/la-banda-trapera-del-rio-dirty-rock-1.jpg",
    );
    cy.findByLabelText(/insert image:/i).type(
      "https://www.dirtyrock.info/wp-content/uploads/ngg_featured/la-banda-trapera-del-rio-dirty-rock-1.jpg",
    );
    cy.findByLabelText(/label cookie image:/i).type(
      "https://www.dirtyrock.info/wp-content/uploads/ngg_featured/la-banda-trapera-del-rio-dirty-rock-1.jpg",
    );
    cy.findByLabelText(/description:/i).type(
      "Ramu cantando feliz despues del bootcamp",
    );
    cy.findByLabelText(/track list:/i).type(
      "Ramu cantando feliz despues del bootcamp",
    );
    cy.findByRole("button", { name: /create new record/i }).click();
    cy.findByText(/loading.../i).should("exist");
    cy.findByAltText(/La banda trapera de Ramu/i).click();
    cy.findByAltText(/delete on/i).click();
  });
});
