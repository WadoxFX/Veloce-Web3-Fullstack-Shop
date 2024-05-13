import data from '../../promocodes.json'

describe('Promo Code', () => {
  const { code, discount } = data.codes[0]

  it('Promo code activation', () => {
    cy.visit('/basket')
    cy.get('input#promocode').type(code)
    cy.contains('Use').click()
    cy.get('[class*="promo_code_discount"]').should('be.visible')
    cy.get('[class*="promo_code_discount"] [class*="meaning"]').should(
      'include.text',
      `${discount}%`,
    )
  })
})
