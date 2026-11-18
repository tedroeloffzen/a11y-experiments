---
name: a11y-review
description: Review Angular components, templates and SCSS for accessibility against WCAG 2.2 AA. Use when asked to check, audit or review accessibility, or before merging UI changes.
---

# Accessibility review (Angular)


## Steps

0. **Context.** Determine whether this is a modern app (uses `@angular/aria`, the component library, Signal Forms), a legacy app (reactive forms, own/Material widgets) or the component library itself. State it at the top of the report; it decides which fixes are appropriate.
1. **Scope.** Determine the changed components (`git diff --name-only` against the base branch). For each, collect the `.ts`, `.html` and `.scss` files. List them before reviewing.
2. **Automated pass.**
   - Run `ng lint` and collect template accessibility findings.
   - Run the component tests for the changed components (they include the axe-core check). Note which states the axe check does *not* cover (e.g. dialog open, form invalid).
   - If a Cypress a11y spec covers the affected pages, run it (`npx cypress run --spec <spec>`).
   Report results, but never present them as the full picture.
3. **Code review**, per component:
   - Building blocks: in modern apps, hand-rolled widgets that should use native HTML, the component library or Angular Aria; in legacy apps, flag such widgets as migration candidates and suggest a fix that fits the existing code
   - Component library: accessible by default, required accessible-name inputs, documented keyboard behaviour, axe tests per state/variant
   - Semantics: native elements, headings, landmarks, table markup; no `(click)` on non-interactive elements
   - Names & labels: `<label for>`, icon buttons, link text that makes sense out of context
   - Text alternatives: alt present *and* meaningful in context
   - Keyboard & focus: all interactions operable; no positive `tabindex`; `:focus-visible` styling present
   - Focus management: dialogs (CDK focus trap, return focus), route changes (title + focus), errors, removed elements
   - Dynamic content: ARIA states bound to component state; `LiveAnnouncer` for status messages
   - Forms: `aria-invalid`, `aria-describedby` to error text, focus on first error
   - SCSS: contrast of the colours used (compute when the values are known), colour-only meaning, `prefers-reduced-motion`, target size, `rem` units
4. **Report** as a table: `WCAG criterion | file:line | issue | impact on user | suggested fix | confidence (high/medium/low)`.
5. **Limits.** End with "Needs manual verification": screen reader announcements (NVDA/VoiceOver), actual focus order in the running app, zoom/reflow, clarity of content and error messages.

## Rules
- Only report issues you can point to; mark uncertain ones as low confidence.
- Prefer native HTML, then the component library / Angular Aria (modern apps) and CDK a11y utilities, over custom ARIA. Don't propose introducing Angular Aria or Signal Forms in a legacy app as a fix for a single issue.
- Never conclude the component is "accessible" or "WCAG compliant" — only that no issues were found in the checks performed.
