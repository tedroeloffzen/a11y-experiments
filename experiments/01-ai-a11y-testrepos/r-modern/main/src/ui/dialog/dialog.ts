import { Component, Injectable, Type, inject } from '@angular/core';
import { DIALOG_DATA, Dialog, DialogRef } from '@angular/cdk/dialog';

let nextId = 0;

export interface UiDialogContext<D = unknown> {
  title: string;
  titleId: string;
  data: D;
}

/**
 * Opent dialogen via Angular CDK Dialog.
 *
 * Toegankelijkheid (geregeld door de service en de CDK):
 * - `role="dialog"` en `aria-labelledby` naar de titel
 * - content buiten de dialoog krijgt `aria-hidden` (de CDK gebruikt dit bewust in plaats van `aria-modal`)
 * - focus gaat de dialoog in, blijft erin (focus trap) en keert terug naar de trigger
 * - Escape sluit de dialoog
 *
 * Gebruik in de dialoog-component `<ui-dialog-layout>` voor titel en sluitknop.
 */
@Injectable({ providedIn: 'root' })
export class UiDialogService {
  private readonly dialog = inject(Dialog);

  open<C, D = unknown, R = unknown>(
    component: Type<C>,
    options: { title: string; data?: D },
  ): DialogRef<R, C> {
    const titleId = `ui-dialog-title-${nextId++}`;
    return this.dialog.open<R, UiDialogContext<D>, C>(component, {
      ariaLabelledBy: titleId,
      autoFocus: 'first-tabbable',
      restoreFocus: true,
      panelClass: 'ui-dialog-panel',
      data: { title: options.title, titleId, data: options.data as D },
    });
  }
}

/** Standaard opmaak voor een dialoog: titel, inhoud, acties en sluitknop. */
@Component({
  selector: 'ui-dialog-layout',
  template: `
    <div class="ui-dialog">
      <header class="ui-dialog__header">
        <h2 class="ui-dialog__title" [id]="context.titleId">{{ context.title }}</h2>
        <button type="button" class="ui-dialog__close" (click)="dialogRef.close()">
          <span aria-hidden="true">×</span>
          <span class="ui-visually-hidden">Sluiten</span>
        </button>
      </header>
      <div class="ui-dialog__content"><ng-content /></div>
      <footer class="ui-dialog__actions"><ng-content select="[uiDialogActions]" /></footer>
    </div>
  `,
  styleUrl: './dialog.scss',
})
export class UiDialogLayout {
  protected readonly context = inject<UiDialogContext>(DIALOG_DATA);
  protected readonly dialogRef = inject(DialogRef);
}
