import { Injector, afterNextRender } from '@angular/core';

/**
 * Zet na de volgende render de focus op het eerste ongeldige veld in `container`.
 * Gebruik na een mislukte `submit()`, zodat toetsenbord- en screenreadergebruikers
 * direct bij de fout uitkomen (en de gekoppelde foutmelding horen).
 */
export function focusFirstInvalid(container: HTMLElement, injector: Injector): void {
  afterNextRender(
    () => container.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
    { injector },
  );
}
