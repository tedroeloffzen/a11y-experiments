# TC2 — Leerling verwijderen (bevestigingsdialoog)

## A1 (kaal)

```
Voeg op de leerlingenpagina per rij een knop toe om de leerling te verwijderen.
Toon eerst een bevestigingsdialoog met de naam van de leerling en de knoppen "Annuleren" en "Verwijderen".
Na bevestigen verdwijnt de leerling uit de lijst. Lokaal is genoeg (geen backend).
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
| Verwijderknop is een `<button>` met unieke naam (bijv. "Verwijder Sanne de Vries") | 2.4.6, 4.1.2 |
| Dialoog heeft rol `dialog` en een naam (titel gekoppeld) | 4.1.2 |
| Focus gaat de dialoog in en blijft erin | 2.4.3 |
| Escape sluit de dialoog | 2.1.1 |
| Na sluiten/annuleren keert focus terug naar de knop | 2.4.3 |
| Na verwijderen: focus naar een logische plek (volgende rij of kop), niet naar `body` | 2.4.3 |
| Verwijdering wordt aangekondigd | 4.1.3 |
| Content achter de dialoog onbereikbaar voor screenreader | 1.3.1 |
| Hergebruik bestaande bouwstenen (CDK Dialog / `UiDialogService`) | — |
