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
    cy.get('[data-test-id="product"]').first().click()

    // Fill out and send a comment
    cy.url().should('include', '/products')
    cy.get('[data-test-id="comments_accordeon"]').click()
    cy.get('[data-test-id="select_grade"]').select('5')
    cy.get('[data-test-id="comment"]').type(user.productComment)
    cy.get('[data-test-id="send_comment"]').click()
    cy.wait('@ReqAddComment').then(xhr => expect(xhr.response?.statusCode).to.eq(204))
    cy.get('[data-test-id="comment_content"]').contains(user.productComment).should('be.visible')

    // Checking for comment deletion
    cy.get('[data-test-id="delete_comment"]').click()
    cy.wait('@ReqDeleteComment').then(xhr => expect(xhr.response?.statusCode).to.eq(204))
    cy.get('[data-test-id="delete_comment"]').contains(user.productComment).should('not.exist')
  })

  after(() => cy.deleteAccount(user.email, user.password))
})
