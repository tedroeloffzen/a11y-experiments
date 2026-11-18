import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { expectNoA11yViolations } from '../testing/axe';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('heeft een skiplink, hoofdnavigatie en main-landmark', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('a.ui-skip-link')).toBeTruthy();
    expect(el.querySelector('nav[aria-label="Hoofdmenu"]')).toBeTruthy();
    expect(el.querySelector('main#main')).toBeTruthy();
  });

  it('heeft geen axe-overtredingen', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    await expectNoA11yViolations(fixture.nativeElement, { rules: { region: { enabled: true } } });
  });
});
