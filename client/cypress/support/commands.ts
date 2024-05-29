declare namespace Cypress {
  interface Chainable {
    signup: (user: any) => void
    login: (email: string, password: string) => void
    deleteAccount: (email: string, password: string) => void
  }
}

Cypress.Commands.add('signup', user => {
  cy.request('POST', 'http://localhost:8080/auth/signup', { ...user }).then(res =>
    expect(res.status).to.eq(201),
  )
})

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.intercept('/auth/login').as('ReqLogin')
  cy.intercept('/auth/profile').as('ReqProfile')

  cy.visit('/login')
  cy.url().should('include', '/login')
  cy.get('[data-test-id="email"]').type(email)
  cy.get('[data-test-id="password"]').type(password)
  cy.get('[data-test-id="loginButton"]').click()

  cy.wait('@ReqLogin').then(xhr => expect(xhr.response?.statusCode).to.eq(200))
  cy.wait('@ReqProfile').then(xhr => expect(xhr.response?.statusCode).to.eq(200))
  cy.url().should('include', '/')
  cy.getCookie('token').should('exist')
})

Cypress.Commands.add('deleteAccount', (email: string, password: string) => {
  cy.request('DELETE', 'http://localhost:8080/auth/deleteAccount', { email, password }).then(res =>
    expect(res.status).to.eq(204),
  )
})