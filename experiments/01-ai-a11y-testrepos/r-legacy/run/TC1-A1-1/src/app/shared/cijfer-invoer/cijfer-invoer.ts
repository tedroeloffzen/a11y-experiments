import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Dropdown, DropdownOption } from '../dropdown/dropdown';
import { LEERLINGEN } from '../leerlingen.data';
import { CijfersStore, VAKKEN, Vak } from '../cijfers.store';

/** Cijfer van 1 t/m 10 met maximaal één decimaal; komma en punt zijn allebei toegestaan. */
export function cijferValidator(control: AbstractControl<string>): ValidationErrors | null {
  if (!control.value) {
    return null;
  }
  const waarde = control.value.trim();
  if (!/^\d{1,2}([.,]\d)?$/.test(waarde)) {
    return { cijfer: true };
  }
  const getal = Number(waarde.replace(',', '.'));
  return getal >= 1 && getal <= 10 ? null : { cijfer: true };
}

/**
 * Formulier waarmee een docent een cijfer voor een leerling invoert.
 */
@Component({
  selector: 'app-cijfer-invoer',
  imports: [ReactiveFormsModule, Dropdown],
  templateUrl: './cijfer-invoer.html',
})
export class CijferInvoer {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(CijfersStore);

  protected readonly leerlingOpties: DropdownOption[] = LEERLINGEN.map((l) => ({
    value: String(l.id),
    label: l.naam,
  }));
  protected readonly vakOpties: DropdownOption[] = VAKKEN.map((v) => ({ value: v, label: v }));

  protected readonly form = this.fb.nonNullable.group({
    leerlingId: ['', Validators.required],
    vak: ['', Validators.required],
    cijfer: ['', [Validators.required, cijferValidator]],
    opmerking: [''],
  });

  protected readonly bevestiging = signal<string | null>(null);

  protected opslaan(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    const { leerlingId, vak, cijfer, opmerking } = this.form.getRawValue();
    const leerling = LEERLINGEN.find((l) => l.id === Number(leerlingId))!;
    const cijferGetal = Number(cijfer.trim().replace(',', '.'));

    this.store.toevoegen({
      leerlingId: leerling.id,
      vak: vak as Vak,
      cijfer: cijferGetal,
      opmerking: opmerking.trim(),
    });

    this.form.reset();
    this.bevestiging.set(`Cijfer opgeslagen voor ${leerling.naam}.`);
  }
}
