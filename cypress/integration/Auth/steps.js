import { Given, Then, When } from "cypress-cucumber-preprocessor/steps"

Given("opened home page", () => {
  cy.visit("http://test.cards.atomix.team/")
})

When("I click to Join", () => {
  cy.contains("Join").click()
})

When("I type {string} to the {string} field", (text, type) => {
  cy.get(`input[type="${type}"]`).type(text)
})

Then("I see {string} in the {string} field", (text, type) => {
  cy.get(`input[type="${type}"]`).should("have.value", text)
})

Then("I make a screenshot", () => {
  cy.percySnapshot()
})

Then("I see {string} in the title", (title) => {
  cy.title().should("include", title)
})

Then("I see {string} in the URL", (path) => {
  cy.url().should("include", path)
})
