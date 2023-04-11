describe(`Fetch ${Cypress.config('baseUrl')}`, () => {
  it('passes', () => {
    // Try to reach base url.
    cy.visit('/')
  })
})
