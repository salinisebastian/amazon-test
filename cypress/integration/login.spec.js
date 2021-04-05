//<reference types="cypress"/>

describe("Our first suite", () => {
  beforeEach("Login", () => {
    cy.visit("https://www.amazon.de/");
    cy.get('[id="sp-cc-accept"]').click();
    cy.contains("Hallo, Anmelden").click();
    cy.get('[id="ap_email"]').type("paulissacnew2000@gmail.com");
    cy.get('[aria-labelledby="continue-announce"]').click();
    cy.get('[id="ap_password"]').type("*****");
    cy.get('[id="signInSubmit"]').click();
  });

  it("Checking whether the username is displayed on the main page", () => {
    cy.get('[id="nav-link-accountList-nav-line-1"]').should("contain", "Paul");
  });

  it("Adding an item to Cart", () => {
    cy.selectProduct("laptop", "Intel");
    cy.wait(2000);
    cy.selectProduct("mobilephone", "Nokia");
  });

  it.only("Printing the cost of items", () => {
    var sum = 0;

    cy.get(".nav-cart-icon").click({ force: true });

    cy.get("#activeCartViewForm")
      .find(
        ".a-size-medium.a-color-base.sc-price.sc-white-space-nowrap.sc-product-price.a-text-bold"
      )
      .each(($el, index, $list) => {
        const cost = $el.text();
        var result = cost.split(/(\s+)/);
        result = result[0].trim().replace(",", ".");
        sum = Number(sum) + Number(result);
      })
      .then(function () {
        cy.log(sum);
      });
    cy.get(
      '[class="a-size-medium a-color-base sc-price sc-white-space-nowrap"]'
    ).then((total) => {
      const cost = total.text();
      var actualResult = cost.split(/(\s+)/);
      actualResult = actualResult[0].trim().replace(",", ".");
      expect(Number(sum.toFixed(2))).to.equal(Number(actualResult));
    });
  });

  it("Clearing the cart if any items are present", () => {
    cy.get("#nav-cart").click();
    cy.get("#a-page").then(($body) => {
      const len = $body.find(".a-row.a-spacing-base.a-spacing-top-base").length;
      if (len > 0) {
        for (let i = 0; i < len; i++) {
          cy.get('[value="Löschen"]').eq(0).click();
          cy.reload();
        }
      }
    });
  });
});
