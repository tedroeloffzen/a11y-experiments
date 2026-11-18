import { Component, input, model, signal } from '@angular/core';

export interface DropdownOption {
  value: string;
  label: string;
}

/**
 * Generieke dropdown die in de hele applicatie wordt gebruikt.
 */
@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
})
export class Dropdown {
  readonly options = input.required<DropdownOption[]>();
  readonly placeholder = input('Kies...');
  readonly value = model<string | null>(null);

  protected readonly open = signal(false);

  protected selectedLabel(): string {
    return this.options().find((o) => o.value === this.value())?.label ?? this.placeholder();
  }

  protected toggle(): void {
    this.open.update((o) => !o);
  }

  protected select(option: DropdownOption): void {
    this.value.set(option.value);
    this.open.set(false);
  }
}
