import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { UiSelect, UiSelectOption } from './select';
import { expectNoA11yViolations } from '../../testing/axe';

@Component({
  imports: [UiSelect],
  template: `<ui-select label="Klas" [options]="options" [(value)]="value" />`,
})
class Host {
  readonly options: UiSelectOption[] = [
    { value: '2A', label: 'Klas 2A' },
    { value: '2B', label: 'Klas 2B' },
  ];
  readonly value = signal<string | null>(null);
}

describe('UiSelect', () => {
  async function setup() {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    return { fixture, el, trigger: el.querySelector<HTMLElement>('[role="combobox"]')! };
  }

  it('heeft rol combobox met een toegankelijke naam', async () => {
    const { el, trigger } = await setup();
    expect(trigger).toBeTruthy();
    const labelId = trigger.getAttribute('aria-labelledby')!;
    expect(el.querySelector(`#${labelId}`)?.textContent?.trim()).toBe('Klas');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });

  it('heeft geen axe-overtredingen, dicht en open', async () => {
    const { fixture, el, trigger } = await setup();
    await expectNoA11yViolations(el);

    trigger.click();
    await fixture.whenStable();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(el.querySelectorAll('[role="option"]').length).toBe(2);
    await expectNoA11yViolations(el);
  });

  it('kiest een optie met het toetsenbord en sluit daarna', async () => {
    const { fixture, trigger } = await setup();
    const key = (k: string) => trigger.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));

    trigger.focus();
    key('ArrowDown');
    await fixture.whenStable();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');

    key('ArrowDown');
    await fixture.whenStable();
    key('Enter');
    await fixture.whenStable();

    expect(fixture.componentInstance.value()).toBe('2B');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
  });
});
