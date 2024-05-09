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
    cy.get('a#userIcon').click()
    cy.url().should('include', '/profile')

    // Clear old data with new content about the user
    cy.get('input#username').clear().type('newUsername')
    cy.get('input#surname').clear().type('newSurname')
    cy.get('input#phone').clear().type('1234567890')
    cy.get('input#country').clear().type('Ukraine')
    cy.get('input#city').clear().type('Rivne')
    cy.contains('Save Profile').click()
    cy.wait('@ReqEditProfile').then(xhr => expect(xhr.response?.statusCode).to.eq(200))
  })

  after(() => cy.deleteAccount(user.email, user.password))
})
