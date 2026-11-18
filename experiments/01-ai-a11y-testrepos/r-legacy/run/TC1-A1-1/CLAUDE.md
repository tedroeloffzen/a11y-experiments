# Leerlingvolg

Angular 22-applicatie voor docenten: leerlingen, cijfers en profielen.

## Stack
- Angular 22, standalone components, signals
- Reactive forms (`@angular/forms`)
- Angular CDK
- SCSS, variabelen in `src/styles/_variables.scss`
- Unit/component tests: Vitest via `ng test` (helper voor axe-core in `src/testing/axe.ts`)
- E2E: Cypress (`cypress/e2e`)

## Conventies
- Pagina's in `src/app/pages/<naam>/<naam>.page.ts`, gedeelde componenten in `src/app/shared/`
- Hergebruik bestaande gedeelde componenten (zoals `app-dropdown`) waar mogelijk
- Component-selector-prefix: `app-`
- Teksten in de UI zijn Nederlands

## Commando's
- `npm start` — dev server op http://localhost:4200
- `npm run build`
- `npm run lint`
- `npm test -- --watch=false`
- `npm run e2e` — vereist draaiende dev server
