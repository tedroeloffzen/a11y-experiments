import { Component, DestroyRef, ElementRef, Injector, afterNextRender, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  constructor() {
    const subscription = inject(Router)
      .events.pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        // Bij de eerste load niet de focus verplaatsen, wel bij elke navigatie daarna.
        if (e.id > 1) {
          afterNextRender(() => this.focusPageHeading(), { injector: this.injector });
        }
      });
    inject(DestroyRef).onDestroy(() => subscription.unsubscribe());
  }

  protected skipToMain(event: Event): void {
    event.preventDefault();
    this.host.nativeElement.querySelector<HTMLElement>('main')?.focus();
  }

  /** Verplaatst na navigatie de focus naar de h1 van de nieuwe pagina. */
  private focusPageHeading(): void {
    const heading = this.host.nativeElement.querySelector<HTMLElement>('main h1');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus();
    }
  }
}
