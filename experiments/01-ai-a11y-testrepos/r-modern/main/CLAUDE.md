# Leerlingvolg

Angular 22-applicatie voor docenten: leerlingen, cijfers en profielen.

## Stack
- Angular 22, standalone components, signals
- Signal Forms (`@angular/forms/signals`)
- Onze component library in `src/ui` (import via `@ui`), gebouwd op Angular Aria en Angular CDK — zie `src/ui/README.md`
- SCSS, design tokens in `src/ui/_tokens.scss`
- Unit/component tests: Vitest via `ng test` (helper voor axe-core in `src/testing/axe.ts`)
- E2E: Cypress (`cypress/e2e`)

## Conventies
- Pagina's in `src/app/pages/<naam>/<naam>.page.ts`
- Gebruik componenten uit `@ui` waar die bestaan; nieuwe herbruikbare componenten horen in `src/ui`
- Component-selector-prefix: `app-` in de app, `ui-` in de library
- Teksten in de UI zijn Nederlands

## Commando's
- `npm start` — dev server op http://localhost:4200
- `npm run build`
- `npm run lint`
- `npm test -- --watch=false`
- `npm run e2e` — vereist draaiende dev server
