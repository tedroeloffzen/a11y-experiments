import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { email, form, required } from '@angular/forms/signals';
import { UiTextField } from './text-field';
import { expectNoA11yViolations } from '../../testing/axe';

@Component({
  imports: [UiTextField],
  template: `<ui-text-field label="E-mailadres" type="email" hint="Voor meldingen" [field]="f.email" />`,
})
class Host {
  readonly f = form(signal({ email: '' }), (p) => {
    required(p.email, { message: 'Vul je e-mailadres in.' });
    email(p.email);
  });
}

describe('UiTextField', () => {
  async function setup() {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    return { fixture, el, input: el.querySelector('input')! };
  }

  it('koppelt het label en zet required', async () => {
    const { el, input } = await setup();
    const label = el.querySelector('label')!;
    expect(label.getAttribute('for')).toBe(input.id);
    expect(input.required).toBe(true);
    expect(input.getAttribute('aria-describedby')).toContain('-hint');
  });

  it('heeft geen axe-overtredingen in de begintoestand', async () => {
    const { el } = await setup();
    await expectNoA11yViolations(el);
  });

  it('koppelt de foutmelding en zet aria-invalid na aanraken', async () => {
    const { fixture, el, input } = await setup();
    fixture.componentInstance.f.email().markAsTouched();
    await fixture.whenStable();

    expect(input.getAttribute('aria-invalid')).toBe('true');
    const errorId = input.getAttribute('aria-describedby')!.split(' ').find((id) => id.endsWith('-error'))!;
    expect(el.querySelector(`#${errorId}`)?.textContent).toContain('Vul je e-mailadres in.');
    await expectNoA11yViolations(el);
  });
});
