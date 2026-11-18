# UI component library

Gedeelde componenten voor onze applicaties. Importeren via `@ui` (zie `tsconfig.json`).

Elke component is standaard toegankelijk: als gebruiker hoef je geen ARIA toe te voegen.
Jij bent wel verantwoordelijk voor goede teksten (labels, titels, foutmeldingen).

| Component | Gebouwd op | Wat de component regelt | Wat jij aanlevert |
|---|---|---|---|
| `ui-text-field` | Signal Forms (`[formField]`) | label-koppeling, `required`, `aria-invalid`, `aria-describedby` voor hint en fouten | `label`, `field`, foutmeldingen via `message` in de validator |
| `ui-select` | Angular Aria combobox + listbox | rollen, `aria-expanded`, `aria-activedescendant`, toetsenbord (pijlen, Enter, Escape) | `label`, `options` |
| `UiDialogService` + `ui-dialog-layout` | Angular CDK Dialog | `role="dialog"`, `aria-labelledby`, `aria-hidden` op content buiten de dialoog, focus trap, Escape, focus terug naar trigger | `title`, inhoud en acties |

## Helpers

- `focusFirstInvalid(container, injector)` — na een mislukte `submit()` de focus naar het eerste ongeldige veld

## Globale klassen (`_global.scss`)

- `.ui-button`, `.ui-button--secondary` — op een native `<button>`
- `.ui-table` — op een native `<table>` met `<caption>`
- `.ui-visually-hidden` — tekst alleen voor screenreaders
- `.ui-skip-link` — skiplink naar `<main>`

## Tokens (`_tokens.scss`)

Kleuren en spacing. Alle tekstkleuren halen WCAG AA op wit. Gebruik de mixin `focus-ring` voor focusstijlen.
