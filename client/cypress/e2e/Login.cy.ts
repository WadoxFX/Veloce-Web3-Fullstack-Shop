describe('Log In', () => {
  let user: CyTestUser

  beforeEach(() => {
    cy.fixture('user.json').then((userData: CyTestUser) => {
      const { infos, comment, productComment, role, ...data } = userData
      cy.signup(data)
      user = userData
    })

    cy.visit('/login')
    cy.intercept('/auth/login').as('ReqLogin')
  })

  it('Filling out data and logging in', () => {
    cy.url().should('include', '/login')
    cy.get('[data-test-id="email"]').type(user.email)
    cy.get('[data-test-id="password"]').type(user.password)
    cy.get('[data-test-id="loginButton"]').click()

    cy.wait('@ReqLogin').then(xhr => expect(xhr.response?.statusCode).to.eq(200))
    cy.url().should('include', '/')
    cy.getCookie('token').should('exist')
  })

  after(() => cy.deleteAccount(user.email, user.password))
})
