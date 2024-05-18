describe('Edit Profile', () => {
  let user: CyTestUser

  beforeEach(() => {
    cy.fixture('user.json').then(userData => {
      const { infos, comment, role, ...data } = userData
      user = userData

      cy.signup(data)
      cy.login(user.email, user.password)
    })

    cy.intercept('PUT', '/users/edit').as('ReqEditProfile')
  })

  it('Changing your account information', () => {
    // Visit the "profile" page
    cy.get('[data-test-id="user_icon"]').click()
    cy.url().should('include', '/profile')

    // Clear old data with new content about the user
    cy.get('[data-test-id="username"]').clear().type('newUsername')
    cy.get('[data-test-id="surname"]').clear().type('newSurname')
    cy.get('[data-test-id="phone"]').clear().type('1234567890')
    cy.get('[data-test-id="country"]').clear().type('Ukraine')
    cy.get('[data-test-id="city"]').clear().type('Rivne')
    cy.get('[data-test-id="save_profile"]').click()
    cy.wait('@ReqEditProfile').then(xhr => expect(xhr.response?.statusCode).to.eq(204))
  })

  after(() => cy.deleteAccount(user.email, user.password))
})
