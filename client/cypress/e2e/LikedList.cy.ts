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
    cy.contains('Shop').click()
    cy.url().should('include', '/shop')
    cy.get('li#product').first().click()

    // Add a product to your favorite list
    cy.url().should('include', '/products')
    cy.contains('Favorite').click()
    cy.wait('@ReqAddInFavorite').then(xhr => expect(xhr.response?.statusCode).to.eq(200))
    cy.get('svg#contained').should('be.visible')

    // Check if the product is on your favorites list
    cy.get('a#userIcon').click()
    cy.url().should('include', '/profile')
    cy.contains('Liked List').click()
    cy.url().should('include', '/liked')
    cy.get('[class*="product_title"]').eq(0)
  })

  after(() => cy.deleteAccount(user.email, user.password))
})
