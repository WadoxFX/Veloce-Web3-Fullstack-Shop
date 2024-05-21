describe('Sign Up', () => {
  let user: CyTestUser

  beforeEach(() => {
    cy.fixture('user.json').then((userData: CyTestUser) => (user = userData))
    cy.visit('/signup')

    cy.intercept('POST', '/auth/signup').as('ReqRegister')
  })

  it('Registration', () => {
    cy.get('[data-test-id="username"]').type(user.username)
    cy.get('[data-test-id="surname"]').type(user.surname)
    cy.get('[data-test-id="email"]').type(user.email)
    cy.get('[data-test-id="password"]').type(user.password)
    cy.get('[data-test-id="signupButton"]').click()

    cy.wait('@ReqRegister').then(xhr => {
      expect(xhr.response?.statusCode).to.eq(201)
    })

    cy.url().should('include', '/')
    cy.getCookie('token').should('exist')

    cy.get('[data-test-id="user_icon"]').click()
    cy.url().should('include', '/profile')
    cy.get('[data-test-id="username"]').should('include.value', user.username)
    cy.get('[data-test-id="surname"]').should('include.value', user.surname)
  })

  after(() => cy.deleteAccount(user.email, user.password))
})
