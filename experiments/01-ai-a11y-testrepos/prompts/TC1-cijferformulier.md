# TC1 — Cijfer invoeren (formulier met validatie)

## A1 (kaal)

```
Voeg op de experimentpagina een formulier toe waarmee een docent een cijfer invoert voor een leerling.
Velden: leerling (kiezen uit de bestaande leerlingen), vak (Nederlands, Engels, Wiskunde, Biologie),
cijfer (1 t/m 10, maximaal één decimaal) en een optionele opmerking.
Leerling, vak en cijfer zijn verplicht. Toon na opslaan een bevestiging en maak het formulier leeg.
Opslaan mag voorlopig alleen lokaal (geen backend).
```

## A2 (gevraagd)

A1 + op een nieuwe regel:

```
Zorg dat het toegankelijk is.
```

## A3 (gestuurd)

A1-prompt, op branch `a11y-rules`.

## Beoordelingscriteria

| Criterium | WCAG |
|---|---|
| Elk veld een zichtbaar, gekoppeld label | 1.3.1, 3.3.2 |
| Verplichte velden als `required` gemarkeerd (niet alleen `*`) | 3.3.2 |
| Foutmelding als tekst, gekoppeld via `aria-describedby`, `aria-invalid` gezet | 3.3.1, 4.1.2 |
| Bij versturen met fouten: focus naar eerste fout of foutsamenvatting | 3.3.1 |
| Leerling/vak-keuze bedienbaar met toetsenbord, met rol en naam | 2.1.1, 4.1.2 |
| Bevestiging na opslaan wordt aangekondigd | 4.1.3 |
| Cijferveld: geschikt inputtype, foutmelding legt uit hoe het goed moet | 3.3.3 |
| Focus zichtbaar op alle velden | 2.4.7 |
| Hergebruik bestaande bouwstenen (`app-dropdown` / `ui-*`) | — |
