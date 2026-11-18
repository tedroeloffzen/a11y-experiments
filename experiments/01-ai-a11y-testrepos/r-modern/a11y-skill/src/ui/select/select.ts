import { Component, computed, input, model, signal } from '@angular/core';
import { Combobox, ComboboxPopup, ComboboxWidget } from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';

let nextId = 0;

export interface UiSelectOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

/**
 * Enkelvoudige select, gebouwd op Angular Aria (combobox + listbox).
 *
 * Toegankelijkheid (geregeld door de component en Angular Aria):
 * - rol `combobox` met popup `listbox`, `aria-expanded`, `aria-activedescendant`
 * - toetsenbord: Enter/Spatie/pijl omlaag opent, pijlen navigeren, Enter kiest, Escape sluit
 * - toegankelijke naam via het zichtbare label (`aria-labelledby`)
 *
 * Verantwoordelijkheid van de gebruiker: een duidelijke `label`-tekst.
 */
@Component({
  selector: 'ui-select',
  imports: [Combobox, ComboboxPopup, ComboboxWidget, Listbox, Option],
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class UiSelect<T = string> {
  /** Zichtbaar label. Verplicht: elke select heeft een toegankelijke naam. */
  readonly label = input.required<string>();
  readonly options = input.required<UiSelectOption<T>[]>();
  readonly placeholder = input('Maak een keuze');
  readonly value = model<T | null>(null);

  protected readonly labelId = `ui-select-${nextId++}-label`;
  protected readonly expanded = signal(false);

  protected readonly selectedValues = computed(() => {
    const value = this.value();
    return value === null ? [] : [value];
  });

  protected readonly selectedLabel = computed(
    () => this.options().find((o) => o.value === this.value())?.label ?? this.placeholder(),
  );

  protected onSelectionChange(values: T[]): void {
    this.value.set(values[0] ?? null);
    this.expanded.set(false);
  }
}
