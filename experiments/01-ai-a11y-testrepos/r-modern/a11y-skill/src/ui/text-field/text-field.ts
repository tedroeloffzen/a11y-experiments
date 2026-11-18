import { Component, computed, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';

let nextId = 0;

const DEFAULT_MESSAGES: Record<string, string> = {
  required: 'Dit veld is verplicht.',
  email: 'Vul een geldig e-mailadres in.',
  minLength: 'De invoer is te kort.',
  maxLength: 'De invoer is te lang.',
};

/**
 * Tekstveld voor Signal Forms met label, hint en foutmeldingen.
 *
 * Toegankelijkheid (geregeld door de component):
 * - zichtbaar `<label>` gekoppeld aan het input
 * - `required`/`disabled` via `[formField]`
 * - `aria-invalid` en `aria-describedby` (hint + fouten) zodra het veld is aangeraakt en ongeldig is
 *
 * Verantwoordelijkheid van de gebruiker: een duidelijke `label`-tekst en foutmeldingen
 * die vertellen hoe de gebruiker het oplost (via `message` in de validator).
 */
@Component({
  selector: 'ui-text-field',
  imports: [FormField],
  templateUrl: './text-field.html',
  styleUrl: './text-field.scss',
})
export class UiTextField {
  /** Zichtbaar label. Verplicht: elk veld heeft een toegankelijke naam. */
  readonly label = input.required<string>();
  /** Het Signal Forms-veld. */
  readonly field = input.required<FieldTree<string>>();
  readonly type = input<'text' | 'email' | 'tel' | 'password' | 'url'>('text');
  readonly hint = input<string>();
  readonly autocomplete = input<string>();

  protected readonly id = `ui-text-field-${nextId++}`;
  protected readonly hintId = `${this.id}-hint`;
  protected readonly errorId = `${this.id}-error`;

  protected readonly state = computed(() => this.field()());
  protected readonly showErrors = computed(() => this.state().touched() && this.state().invalid());

  protected readonly describedBy = computed(() => {
    const ids = [this.hint() ? this.hintId : null, this.showErrors() ? this.errorId : null];
    return ids.filter(Boolean).join(' ') || null;
  });

  protected message(error: { kind: string; message?: string }): string {
    return error.message ?? DEFAULT_MESSAGES[error.kind] ?? 'Ongeldige invoer.';
  }
}
