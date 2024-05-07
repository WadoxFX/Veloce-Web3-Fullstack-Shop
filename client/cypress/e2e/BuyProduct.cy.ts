describe('Buy product', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.contains('Shop').click()
  })

  it('Find product and configure it', () => {
    cy.get('li#product').first().click()

    cy.url().should('include', '/products')
    cy.get('label').last().click()
    cy.contains('Add To Bag').click()
    cy.contains('View Bag').click()

    cy.url().should('include', '/basket')
    cy.contains('Checkout').click()

    cy.url().should('include', '/basket/payment')
    cy.fixture('user.json').then(user => {
      const { city, country, phone, post } = user.infos

      cy.get('input#username').type(user.username)
      cy.get('input#surname').type(user.surname)
      cy.get('input#phone').type(phone)
      cy.get('input#country').type(country)
      cy.get('input#city').type(city)
      cy.get('input#post').type(post)
      cy.get('textarea').type(user.comment)
    })
  })
})
