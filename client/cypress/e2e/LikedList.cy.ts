describe('Liked List', () => {
  let user: CyTestUser

  beforeEach(() => {
    cy.fixture('user.json').then(userData => {
      const { infos, comment, role, ...data } = userData
      user = userData

      cy.signup(data)
      cy.login(user.email, user.password)
    })

    cy.intercept('PUT', '/products/addInFavorite').as('ReqAddInFavorite')
  })

  it('Adding a product to your favorites list', () => {
    // Finding the first product
    cy.get('[data-test-id="Shop"]').click()
    cy.url().should('include', '/shop')
    cy.get('[data-test-id="product"]').first().click()

    // Add a product to your favorite list
    cy.url().should('include', '/products')
    cy.get('[data-test-id="favorite"]').click()
    cy.wait('@ReqAddInFavorite').then(xhr => expect(xhr.response?.statusCode).to.eq(204))
    cy.get('[data-test-id="contained"]').should('be.visible')
    
    // Check if the product is on your favorites list
    cy.get('[data-test-id="user_icon"]').click()
    cy.url().should('include', '/profile')
    cy.contains('Liked List').click()
    cy.url().should('include', '/liked')
    cy.get('[data-test-id="product_title"]').eq(0)
  })

  after(() => cy.deleteAccount(user.email, user.password))
})
