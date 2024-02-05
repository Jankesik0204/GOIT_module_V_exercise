class LoginPage {
  visit() {
    cy.visit("https://www.edu.goit.global/account/login");
  }

  fillEmail(email) {
    cy.get("#user_email").type(email);
  }

  fillPassword(password) {
    cy.get('[name="password"]').type(password);
  }

  submitLoginForm() {
    cy.get('button[type="submit"]').click();
  }
}

export default LoginPage;
