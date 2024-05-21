import data from '../../promocodes.json'

describe('Promo Code', () => {
  const { code, discount } = data.codes[0]

  it('Promo code activation', () => {
    cy.visit('/basket')
    cy.get('[data-test-id="promocode_input"]').type(code)
    cy.get('[data-test-id="use_promocode"]').click()
    cy.get('[data-test-id="promo_code_discount"]').should('be.visible')
    cy.get('[data-test-id="promo_code_discount"] [class*="meaning"]').should(
      'include.text',
      `${discount}%`,
    )
  })
})
