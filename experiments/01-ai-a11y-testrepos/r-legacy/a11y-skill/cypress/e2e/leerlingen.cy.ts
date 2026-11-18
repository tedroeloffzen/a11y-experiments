describe('Leerlingen', () => {
  it('toont de leerlingen en filtert op klas', () => {
    cy.visit('/leerlingen');
    cy.get('tbody tr').should('have.length', 6);

    cy.get('.dropdown-toggle').click();
    cy.contains('.dropdown-item', 'Klas 2B').click();
    cy.get('tbody tr').should('have.length', 2);
  });
});
