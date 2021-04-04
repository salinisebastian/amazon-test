// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("selectProduct", (category, itemname) => {
  cy.get("#twotabsearchtextbox")
    .should("be.visible")
    .then(() => {
      cy.get("#twotabsearchtextbox")

        .type(category, {
          force: true,
        })
        .wait(1000);
    });

  cy.get("#nav-search-submit-button").click();

  cy.get(".a-size-medium.a-color-base.a-text-normal").each(
    ($el, index, $list) => {
      if ($el.text().includes(itemname)) {
        cy.get(".a-size-medium.a-color-base.a-text-normal").eq(index).click();
        return false;
      }
    }
  );
  cy.get("#add-to-cart-button").click();
  cy.get('[aria-labelledby="attachSiNoCoverage-announce"]').click();
});
