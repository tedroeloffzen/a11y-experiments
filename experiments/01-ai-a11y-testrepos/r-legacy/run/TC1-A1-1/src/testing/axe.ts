import axe from 'axe-core';

/**
 * Draait axe-core op een element in een component test.
 *
 * - Toetst tegen WCAG 2.0/2.1/2.2 A en AA.
 * - `color-contrast` staat uit: jsdom berekent geen layout/kleuren, dus die check
 *   is hier niet betrouwbaar. Contrast wordt in de Cypress e2e-tests gecontroleerd.
 * - `region` staat uit: een losse component staat in een test niet in een landmark.
 */
export async function expectNoA11yViolations(
  element: Element,
  options: axe.RunOptions = {},
): Promise<void> {
  const results = await axe.run(element, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
    },
    ...options,
    rules: {
      'color-contrast': { enabled: false },
      region: { enabled: false },
      ...options.rules,
    },
  });

  const violations = results.violations.map(
    (v) => `${v.id} (${v.impact}): ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).join('\n  ')}`,
  );
  expect(violations).toEqual([]);
}
