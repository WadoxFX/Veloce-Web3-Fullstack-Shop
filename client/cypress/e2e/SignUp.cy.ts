describe('Sign Up', () => {
  let fixtureUser: CyTestUser

  beforeEach(() => {
    cy.fixture('user.json').then((user: CyTestUser) => (fixtureUser = user))
    cy.visit('/signup')

    cy.intercept('POST', '/auth/signup').as('ReqRegister')
  })

  it('Registration', () => {
    cy.get('input#username').type(fixtureUser.username)
    cy.get('input#surname').type(fixtureUser.surname)
    cy.get('input#email').type(fixtureUser.email)
    cy.get('input#password').type(fixtureUser.password)
    cy.contains('Log In').click()

    cy.wait('@ReqRegister').then(xhr => {
      expect(xhr.response?.statusCode).to.eq(201)
    })

    cy.url().should('include', '/')
    cy.getCookie('token').should('exist')

    cy.get('a#userIcon').click()
    cy.url().should('include', '/profile')
    cy.get('input#username').should('include.value', fixtureUser.username)
    cy.get('input#surname').should('include.value', fixtureUser.surname)
  })

  after(() => {
    cy.wait(1000)
    cy.request('DELETE', 'http://localhost:8080/auth/deleteAccount', { ...fixtureUser }).then(res =>
      expect(res.status).to.eq(204),
    )
  })
})
