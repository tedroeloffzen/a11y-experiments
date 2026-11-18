import { Injectable, signal } from '@angular/core';

export const VAKKEN = ['Nederlands', 'Engels', 'Wiskunde', 'Biologie'] as const;
export type Vak = (typeof VAKKEN)[number];

export interface Cijfer {
  leerlingId: number;
  vak: Vak;
  cijfer: number;
  opmerking: string;
}

/**
 * Bewaart ingevoerde cijfers in het geheugen. Er is (nog) geen backend.
 */
@Injectable({ providedIn: 'root' })
export class CijfersStore {
  private readonly _cijfers = signal<Cijfer[]>([]);
  readonly cijfers = this._cijfers.asReadonly();

  toevoegen(cijfer: Cijfer): void {
    this._cijfers.update((lijst) => [...lijst, cijfer]);
  }
}
