#!/usr/bin/env bash
# Maakt een schone branch voor één experiment-run en toont de prompt.
# Gebruik: ./start-run.sh <repo> <testcase> <variant> <run>
# Voorbeeld: ./start-run.sh r-legacy TC1 A1 1
set -euo pipefail

repo="${1:?repo (r-legacy|r-modern)}"
tc="${2:?testcase (TC1|TC2)}"
variant="${3:?variant (A1|A2|A3|B2|B3)}"
run="${4:?run (1|2|3)}"

case "$variant" in
  A1|A2|B2) base=main ;;
  A3) base=a11y-rules ;;
  B3) base=a11y-skill ;;
  *) echo "Onbekende variant: $variant" >&2; exit 1 ;;
esac

here="$(cd "$(dirname "$0")" && pwd)"
cd "$here/$repo"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Er staan nog niet-gecommitte wijzigingen in $repo. Commit of stash eerst." >&2
  exit 1
fi

branch="run/${tc}-${variant}-${run}"
git checkout -q "$base"
git checkout -q -b "$branch"
echo "Branch $branch aangemaakt vanaf $base in $repo"
echo

prompt_file="$(ls "$here"/prompts/"$tc"-*.md 2>/dev/null | head -1)"
if [[ -n "$prompt_file" && "$variant" == A* ]]; then
  echo "---- Prompt ($variant) uit $(basename "$prompt_file") ----"
  awk '/^## A1/{f=1;next} /^## /{f=0} f' "$prompt_file" | sed -n '/^```$/,/^```$/p' | sed '/^```$/d'
  if [[ "$variant" == A2 ]]; then
    echo "Zorg dat het toegankelijk is."
  fi
  echo "----"
fi
echo
echo "Start nu een nieuwe Claude Code-sessie in $repo en plak de prompt."
