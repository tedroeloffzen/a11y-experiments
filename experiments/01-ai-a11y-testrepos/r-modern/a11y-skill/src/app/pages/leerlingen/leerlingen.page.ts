import { Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { UiSelect, UiSelectOption } from '@ui';
import { LEERLINGEN } from '../../shared/leerlingen.data';

@Component({
  selector: 'app-leerlingen-page',
  imports: [UiSelect, DecimalPipe],
  templateUrl: './leerlingen.page.html',
  styleUrl: './leerlingen.page.scss',
})
export class LeerlingenPage {
  protected readonly klasOpties: UiSelectOption[] = [
    { value: '', label: 'Alle klassen' },
    ...[...new Set(LEERLINGEN.map((l) => l.klas))].map((k) => ({ value: k, label: `Klas ${k}` })),
  ];

  protected readonly klas = signal<string | null>('');

  protected readonly leerlingen = computed(() => {
    const klas = this.klas();
    return klas ? LEERLINGEN.filter((l) => l.klas === klas) : LEERLINGEN;
  });
}
