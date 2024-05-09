describe('Comment', () => {
  let user: CyTestUser

  beforeEach(() => {
    cy.fixture('user.json').then(userData => {
      const { infos, comment, role, ...data } = userData
      user = userData

      cy.signup(data)
      cy.login(user.email, user.password)
    })

    cy.intercept('PUT', '/products/addComment').as('ReqAddComment')
    cy.intercept('PUT', '/products/deleteComment').as('ReqDeleteComment')
  })

  it('Create and remove comment', () => {
    // Finding the first product
    cy.url().should('include', '/')
    cy.contains('Shop').click()
    cy.url().should('include', '/shop')
    cy.get('li#product').first().click()

    // Fill out and send a comment
    cy.url().should('include', '/products')
    cy.get('[class*="comments_accordeon"]').click()
    cy.get('select').select('5')
    cy.get('input#comment').type(user.productComment)
    cy.contains('Send').click()
    cy.wait('@ReqAddComment').then(xhr => expect(xhr.response?.statusCode).to.eq(200))
    cy.get('[class*="comment_content"]').contains(user.productComment).should('be.visible')

    // Checking for comment deletion
    cy.get('[aria-label="Delete comment"]').click()
    cy.wait('@ReqDeleteComment').then(xhr => expect(xhr.response?.statusCode).to.eq(200))
    cy.get('p').contains(user.productComment).should('not.exist')
  })

  after(() => cy.deleteAccount(user.email, user.password))
})
