/**
 * Test didomi.
 */
export function testDidomi(url = '/') {

  it('Didomi', () => {

    // Go to front page.
    cy.visit(url);

    // Wait for didomi to load.
    cy.wait(1000);

    // Check didomi popup behavior only if it appears in DOM.
    cy.document().then(($document) => {
      $document.querySelectorAll('#didomi-popup').forEach(item => {
        cy.get('#didomi-popup').should('be.visible');

        cy.get('#didomi-notice-disagree-button').click();
        cy.get('#didomi-popup').should('not.exist');
      });
    });
  })
}
