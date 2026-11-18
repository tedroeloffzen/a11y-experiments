import { Component, ElementRef, Injector, inject, signal } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormRoot, email, form, required, submit } from '@angular/forms/signals';
import { UiTextField, focusFirstInvalid } from '@ui';

interface Profiel {
  naam: string;
  email: string;
}

@Component({
  selector: 'app-profiel-page',
  imports: [FormRoot, UiTextField],
  templateUrl: './profiel.page.html',
})
export class ProfielPage {
  private readonly announcer = inject(LiveAnnouncer);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  protected readonly model = signal<Profiel>({ naam: '', email: '' });

  protected readonly profielForm = form(this.model, (p) => {
    required(p.naam, { message: 'Vul je naam in.' });
    required(p.email, { message: 'Vul je e-mailadres in.' });
    email(p.email, { message: 'Vul een e-mailadres in zoals naam@school.nl.' });
  });

  protected async opslaan(event: Event): Promise<void> {
    event.preventDefault();
    const opgeslagen = await submit(this.profielForm, async () => {
      await this.announcer.announce('Profiel opgeslagen.');
      return undefined;
    });
    if (!opgeslagen) {
      focusFirstInvalid(this.host.nativeElement, this.injector);
    }
  }
}
