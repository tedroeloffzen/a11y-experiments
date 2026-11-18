# Draaiboek experimenten

Twee testrepo's die onze twee werelden nabootsen. **Laat dit bestand en de `prompts/`-map buiten de repo's**: Claude Code mag niet weten dat het een experiment is.

| Repo | Lijkt op | Inhoud |
|---|---|---|
| `r-legacy` | bestaande apps | Angular 22 + CDK, reactive forms, eigen `app-dropdown`, oudere lint-config (zonder template-accessibility-regels) |
| `r-modern` | nieuwe apps | Angular 22 + CDK + Angular Aria, Signal Forms, component library in `src/ui` (`ui-text-field`, `ui-select`, `UiDialogService`) |

Beide: Vitest-component tests met axe-core-helper (`src/testing/axe.ts`), Cypress + cypress-axe, angular-eslint.

## Branches

| Branch | Inhoud | Gebruikt voor |
|---|---|---|
| `main` | basis-app, neutrale `CLAUDE.md` | A1, A2, B2 |
| `a11y-rules` | `main` + toolkit-regels in `CLAUDE.md` | A3 |
| `a11y-skill` | `main` + `.claude/skills/a11y-review` | B3 |

## Eén run uitvoeren (experiment A)

```bash
./start-run.sh r-legacy TC1 A1 1     # maakt branch run/TC1-A1-1 vanaf de juiste basis en toont de prompt
cd r-legacy && claude                # nieuwe Claude Code-sessie, plak de prompt
```

Daarna, in de repo:

```bash
git add -A && git commit -m "run TC1-A1-1"   # output bewaren
npm run lint; npm run lint:a11y              # lint:a11y alleen in r-legacy
npm test -- --watch=false
npm start  &  npm run e2e                    # of: npx cypress open
```

Vul per run `03-experimenten/resultaten-template.md` in (project) met: automatische resultaten, toetsenbordtest, screenreadertest (NVDA/VoiceOver), en of Claude Code bestaande bouwstenen gebruikte.

Spelregels: elke run in een **nieuwe** Claude Code-sessie, zelfde model, 3 runs per variant, niets bijsturen tijdens de run.

## Wat let je op?

| Vraag | R-legacy | R-modern |
|---|---|---|
| Hergebruikt het bestaande bouwstenen? | Neemt het `app-dropdown` over (met zijn gebreken) of maakt het een native `<select>`? | Gebruikt het `ui-select`/`ui-text-field`/`UiDialogService`, of bouwt het zelf? |
| Formulier-a11y | Labels, `aria-invalid`, `aria-describedby`, focus naar eerste fout | Idem — `[formField]` zet alleen `required`/`disabled`, niet `aria-invalid` |
| Statusmelding | Wordt "opgeslagen" aangekondigd (`LiveAnnouncer`/live region)? | Idem |
| Verificatie | Draait het lint/tests? Voegt het een axe-test toe? | Idem |

## Bekende a11y-problemen in de basis (níet vertellen aan Claude Code)

Handig als nulmeting en voor experiment B.

**r-legacy**
1. `app-dropdown`: `div` met `(click)`, niet focusbaar, geen toetsenbordbediening, geen rollen/ARIA (2.1.1, 4.1.2)
2. Filterlabel "Klas" is een `span`, niet gekoppeld aan de dropdown (1.3.1, 4.1.2)
3. Menu-links: `outline: none` zonder vervanging (2.4.7)
4. Geen skiplink, geen landmarks (`header`/`nav`/`main`) (2.4.1, 1.3.1)
5. Geen route-titels; focus blijft hangen na navigatie (2.4.2)
6. Profiel: foutmeldingen niet gekoppeld (`aria-describedby`), geen `aria-invalid`, geen focus naar eerste fout (3.3.1)
7. E-mailveld `type="text"` zonder `autocomplete` (1.3.5)
8. "Profiel opgeslagen" wordt niet aangekondigd (4.1.3)
9. Onvoldoende alleen met rode kleur aangeduid (1.4.1)
10. `$color-muted: #888` op wit = 3,5:1 (1.4.3); `$color-error: #d9534f` op wit = 4,0:1 (1.4.3)
11. Tabelkoppen zonder `scope`, tabel zonder `caption` (best practice)

**r-modern**: geen bekende problemen in de basis — dat is precies de bedoeling (nulmeting = schoon).

### Nulmeting (12 nov 2026, axe-core 4.14 in headless Chrome, angular-eslint 22.6)

| Tool | r-legacy: gevonden van de 11 | r-modern |
|---|---|---|
| `npm run lint` (standaardconfig) | 0 | schoon |
| `npm run lint:a11y` (template-accessibility) | 1 (#1) | — |
| axe-core component tests (jsdom, zonder contrast) | 0 | schoon |
| axe-core in Chrome op `/leerlingen` en `/profiel` | 1 (#10, contrast) | schoon |
| Toetsenbord (Tab door `/leerlingen`) | #1 direct zichtbaar: Tab slaat de dropdown over | combobox bereikbaar, filteren met pijlen + Enter werkt |

Conclusie voor de talk: de automatische tools samen vinden **2 van de 11** bekende problemen in r-legacy. Ook een dropdown die met het toetsenbord onbereikbaar is, komt door axe heen.

## Prompts

Zie `prompts/`. A2 = A1-prompt + de zin "Zorg dat het toegankelijk is." Gebruik voor beide repo's exact dezelfde prompt.

## Nog te doen

- [ ] Experiment B: aparte pagina met geplante problemen (ground truth) per repo
- [ ] Cypress-binary installeren op je eigen machine (`npx cypress install`) — in deze omgeving niet gedownload
