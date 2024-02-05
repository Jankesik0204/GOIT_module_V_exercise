class HomePage {
  openMobileMenu() {
    cy.get("#open-navigation-menu-mobile.next-7afvtf.e1phyiqy6").click();
  }

  selectMenuItem() {
    cy.get(".next-bve2vl.e1phyiqy2").eq(2).click();
  }
}

export default HomePage;
