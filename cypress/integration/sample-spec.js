describe("My first test", () => {
  it("Visit the Google", () => {
    cy.visit("https://test.cards.atomix.team")
    cy.contains("Join").click()
    cy.url().should("include", "join")
    cy.get("input[type='email']")
      .type("fake@user.com")
      .should("have.value", "fake@user.com")

    cy.get("input[type='password']")
      .type("SOMEHARDPASSWORD")
      .should("have.value", "SOMEHARDPASSWORD")
  })
})
