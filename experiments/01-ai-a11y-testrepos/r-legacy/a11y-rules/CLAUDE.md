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

## Accessibility

All UI code must meet WCAG 2.2 level AA. Accessibility is a functional requirement, not a polish step.

### First: know which kind of app this is
Check `package.json` and existing code before writing UI:
- **Modern app or component library** — uses `@angular/aria`, our component library and/or Signal Forms.
- **Existing (legacy) app** — no `@angular/aria`, reactive forms, own or Material widgets.

Follow the patterns of the app you are in. Do not introduce `@angular/aria` or Signal Forms into a legacy app, and do not mix forms APIs within one feature, unless the task explicitly asks for a migration. When you touch an inaccessible hand-rolled widget in a legacy app, fix the concrete a11y issue and mention it as a migration candidate in your summary — don't rewrite it unasked.

### Choosing the building block (in this order)
1. **Native HTML** — `<button>`, `<a>`, `<input>`, `<select>`, `<dialog>`, `<details>`, `<table>`.
2. **Our component library** (modern apps) or **existing accessible components in this codebase** (legacy apps) — reuse, don't rebuild.
3. **Angular Aria (`@angular/aria`)** — *modern apps and the component library only* — for custom interactive widgets (combobox, listbox, select, menu, tabs, accordion, tree, grid, toolbar). Its headless directives handle ARIA attributes, keyboard interaction and focus; we supply markup and SCSS.
4. **Angular CDK a11y utilities** (all apps) for behaviour around components: `cdkTrapFocus`, `LiveAnnouncer`, `FocusMonitor`, `cdkAriaLive`.
5. Hand-written ARIA following the WAI-ARIA Authoring Practices pattern — in legacy apps where 1–4 don't apply, otherwise only as a last resort. Say so in your summary.

### Component library (extra rules when working in the library itself)
- Every component is accessible by default; consumers must not need to add ARIA to get it right.
- Required accessible names are required inputs (e.g. a label input that must be set), not optional ones.
- Document per component: keyboard interaction, the ARIA pattern used, and what the consumer is responsible for (e.g. meaningful label text).
- Every component has axe-core tests for each visual state and variant.

### Templates (*.html)
- Use native elements before ARIA: `<button>`, `<a [routerLink]>`, `<input>`, `<select>`, `<table>`. Never put `(click)` on a `div`/`span`; if unavoidable, add a role, `tabindex="0"` and keyboard handlers — but prefer a `<button>`.
- Bind ARIA with attribute binding: `[attr.aria-expanded]="open"`, `[attr.aria-describedby]="errorId"`.
- One `<h1>` per routed page; headings in order. Use `<header>`, `<nav>`, `<main>`, `<footer>`; the app shell has a skip link to `<main>`.
- Icon-only buttons need an accessible name (`aria-label` or visually hidden text). Decorative icons get `aria-hidden="true"`.
- Images: alt text that conveys purpose in context; `alt=""` for decorative images. If purpose is unknown, add `<!-- TODO(a11y): alt text -->` and say so.

### Forms
Use the forms API the app already uses: Signal Forms in modern apps, reactive forms in legacy apps. The rules below apply to both. Note: Signal Forms' `[formField]` sets native `required`/`disabled`/`readonly` on inputs, but **not** `aria-invalid` or `aria-describedby` — add those yourself (or use the component library field, which does).
- Every control has a visible `<label for>`; placeholder is not a label. Group related controls in `<fieldset>` + `<legend>`.
- Mark required fields with `required` (not only an asterisk).
- When a control is invalid and touched/submitted: set `[attr.aria-invalid]="true"`, show the error as text, link it with `[attr.aria-describedby]`.
- On submit with errors, move focus to the first invalid control or an error summary.

### Focus and dynamic behaviour (use Angular CDK a11y)
- Dialogs/overlays: use `MatDialog`/CDK Dialog or `cdkTrapFocus` with `cdkTrapFocusAutoCapture`; Escape closes; focus returns to the trigger. Don't add `aria-modal="true"` to CDK dialogs: the CDK hides outside content with `aria-hidden` instead, on purpose.
- Status messages (saved, loading, result counts): announce with `LiveAnnouncer` from `@angular/cdk/a11y` (polite by default; assertive only for urgent errors).
- Routing: give every route a `title` (or use a `TitleStrategy`) and move focus to the page heading or `<main>` after navigation.
- Keep ARIA state in sync with component state (`aria-expanded`, `aria-selected`, `aria-sort`, `aria-current="page"`).
- Never hand-roll a combobox, tabs, menu, tree or grid in a modern app: use the component library or Angular Aria. In legacy apps, reuse what exists and make it follow the APG keyboard pattern.

### Styles (*.scss)
- Never `outline: none` without a visible `:focus-visible` replacement.
- Text contrast ≥ 4.5:1 (3:1 for large text and UI component boundaries). Use the project's colour tokens; do not introduce new colours without checking contrast.
- Don't convey meaning by colour alone (add icon or text).
- Wrap animations in `@media (prefers-reduced-motion: no-preference)`.
- Use `rem` for font sizes; layout must reflow at 320px width / 400% zoom without horizontal scrolling.
- Interactive targets at least 24×24 CSS px.

### Verification (do this before saying you're done)
- Run `ng lint` and fix template accessibility errors.
- Add or update the component test with the project's axe-core check for the changed component — also for states after interaction (open, invalid, expanded).
- For new pages or flows, add a `cy.checkA11y()` step to the relevant Cypress spec (including after opening dialogs/menus).
- Report which a11y decisions you made and what still needs manual verification (screen reader output, real focus order).
