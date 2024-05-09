describe('Sign Up', () => {
  let user: CyTestUser

  beforeEach(() => {
    cy.fixture('user.json').then((userData: CyTestUser) => (user = userData))
    cy.visit('/signup')

    cy.intercept('POST', '/auth/signup').as('ReqRegister')
  })

  it('Registration', () => {
    cy.get('input#username').type(user.username)
    cy.get('input#surname').type(user.surname)
    cy.get('input#email').type(user.email)
    cy.get('input#password').type(user.password)
    cy.contains('Log In').click()

    cy.wait('@ReqRegister').then(xhr => {
      expect(xhr.response?.statusCode).to.eq(201)
    })

    cy.url().should('include', '/')
    cy.getCookie('token').should('exist')

    cy.get('a#userIcon').click()
    cy.url().should('include', '/profile')
    cy.get('input#username').should('include.value', user.username)
    cy.get('input#surname').should('include.value', user.surname)
  })

  after(() => cy.deleteAccount(user.email, user.password))
})
