import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profiel-page',
  imports: [ReactiveFormsModule],
  templateUrl: './profiel.page.html',
})
export class ProfielPage {
  private readonly fb = inject(FormBuilder);

  protected readonly form = this.fb.nonNullable.group({
    naam: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  protected readonly opgeslagen = signal(false);

  protected opslaan(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.opgeslagen.set(true);
  }
}
