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
    cy.intercept('/auth/profile').as('ReqProfile')
  })

  it('Filling out data and logging in', () => {
    cy.url().should('include', '/login')
    cy.get('input#email').type(user.email)
    cy.get('input#password').type(user.password)
    cy.get('button').contains('Log In').click()

    cy.wait('@ReqLogin').then(xhr => expect(xhr.response?.statusCode).to.eq(200))
    cy.wait('@ReqProfile').then(xhr => expect(xhr.response?.statusCode).to.eq(200))
    cy.url().should('include', '/')
    cy.getCookie('token').should('exist')
  })

  after(() => cy.deleteAccount(user.email, user.password))
})
