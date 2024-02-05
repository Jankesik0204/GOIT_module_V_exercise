describe("User can login to GoIT page.", () => {
  beforeEach("go to page", () => {
    cy.visit("https://www.edu.goit.global/account/login");
  });
  it("Succesfully login to the GoIT page", () => {
    cy.wait(1000);
    cy.get("#user_email").type("testowyqa@qa.team");
    cy.get('[name="password"]').type("QA!automation-1");
    cy.wait(3000);
    cy.get('button[type="submit"]').click();
    cy.wait(5000);
    cy.get("#open-navigation-menu-mobile.next-7afvtf.e1phyiqy6").click();
    cy.wait(2000);
    cy.get(".next-bve2vl.e1phyiqy2").eq(2).click(); //wybieram drugi element o klasie next-bve2vl.e1phyiqy2
  });
});
