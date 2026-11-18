# 01 — Toegankelijkheid van door AI gegenereerde Angular-code

**Vraag:** hoe toegankelijk is de code die Claude Code schrijft in een realistische Angular-codebase,
en wat helpt: een prompt-zin, regels in `CLAUDE.md` of een a11y-review skill?

## Inhoud

| Pad | Wat |
|---|---|
| `DRAAIBOEK.md` | Hoe je een run uitvoert, de varianten (A1–A3, B2–B3) en de bekende a11y-problemen in de basis |
| `prompts/` | Testcase-prompts: TC1 cijferformulier, TC2 verwijderdialoog |
| `r-legacy/`, `r-modern/` | De twee testapps, **één map per branch** |
| `repos/*.bundle` | Volledige Git-geschiedenis van beide testapps, inclusief alle branches |
| `start-run.sh` | Script uit het draaiboek; werkt op een herstelde Git-repo (zie hieronder) |

### Branches als mappen

| Map | Gebruikt voor |
|---|---|
| `main/` | basis-app met neutrale `CLAUDE.md` (A1, A2, B2) |
| `a11y-rules/` | `main` + toolkit-regels in `CLAUDE.md` (A3) |
| `a11y-skill/` | `main` + `.claude/skills/a11y-review` (B3) |
| `run/<TC>-<variant>-<n>/` | uitkomst van een run (r-legacy: `run/TC1-A1-1`) |

## Een run uitvoeren

Draai experimenten **niet** in deze repo: Claude Code mag het draaiboek en de prompts niet zien.
Herstel de testapps buiten deze map vanuit de bundles:

```bash
mkdir -p ~/a11y-runs && cd ~/a11y-runs
cp /pad/naar/a11y-experiments/experiments/01-ai-a11y-testrepos/start-run.sh .
cp -R /pad/naar/a11y-experiments/experiments/01-ai-a11y-testrepos/prompts .
for r in r-legacy r-modern; do
  git clone -q /pad/naar/a11y-experiments/experiments/01-ai-a11y-testrepos/repos/$r.bundle $r
  (cd $r && for b in main a11y-rules a11y-skill; do git show-ref -q refs/heads/$b || git branch -q --track $b origin/$b; done && git checkout -q main && npm ci)
done
./start-run.sh r-legacy TC1 A1 1
```

Na een run: kopieer de uitkomst naar `r-<repo>/run/<TC>-<variant>-<n>/` hier en ververs de bundle
(`git bundle create repos/<repo>.bundle --all` vanuit de herstelde repo).

## Resultaten

- Nulmeting (12 nov 2026): de automatische tools samen vinden **2 van de 11** bekende problemen in r-legacy (zie `DRAAIBOEK.md`).
- Runs: `r-legacy/run/TC1-A1-1` (nog te beoordelen).
