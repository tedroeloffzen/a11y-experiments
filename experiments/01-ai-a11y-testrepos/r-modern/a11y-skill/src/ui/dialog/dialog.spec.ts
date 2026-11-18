import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { UiDialogLayout, UiDialogService } from './dialog';
import { expectNoA11yViolations } from '../../testing/axe';

@Component({
  imports: [UiDialogLayout],
  template: `
    <ui-dialog-layout>
      <p>Weet je het zeker?</p>
      <button uiDialogActions type="button" class="ui-button">Bevestigen</button>
    </ui-dialog-layout>
  `,
})
class ConfirmDialog {}

describe('UiDialogService', () => {
  afterEach(() => document.querySelectorAll('.cdk-overlay-container').forEach((n) => n.remove()));

  it('opent een dialoog met rol en een gekoppelde titel', async () => {
    const service = TestBed.inject(UiDialogService);
    const ref = service.open(ConfirmDialog, { title: 'Cijfer verwijderen' });
    await new Promise((r) => setTimeout(r));

    const dialog = document.querySelector<HTMLElement>('[role="dialog"]')!;
    expect(dialog).toBeTruthy();
    const titleId = dialog.getAttribute('aria-labelledby')!;
    expect(document.getElementById(titleId)?.textContent).toBe('Cijfer verwijderen');

    await expectNoA11yViolations(dialog);
    ref.close();
  });
});
