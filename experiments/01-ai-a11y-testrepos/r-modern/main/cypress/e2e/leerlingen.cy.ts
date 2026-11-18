const wcagAA = {
  runOnly: { type: 'tag' as const, values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
};

describe('Leerlingen', () => {
  beforeEach(() => {
    cy.visit('/leerlingen');
    cy.injectAxe();
  });

  it('filtert op klas met het toetsenbord', () => {
    cy.get('tbody tr').should('have.length', 6);
    cy.get('[role="combobox"]').focus().type('{downArrow}');
    cy.get('[role="listbox"]').should('be.visible');
    cy.checkA11y(null, wcagAA);
  });

  it('heeft geen detecteerbare overtredingen bij laden', () => {
    cy.checkA11y(null, wcagAA);
  });
});
