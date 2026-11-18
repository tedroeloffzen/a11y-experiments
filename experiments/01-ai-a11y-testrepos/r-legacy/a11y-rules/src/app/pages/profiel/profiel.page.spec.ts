import { TestBed } from '@angular/core/testing';
import { ProfielPage } from './profiel.page';
import { expectNoA11yViolations } from '../../../testing/axe';

describe('ProfielPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ProfielPage] }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProfielPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('has no detectable accessibility violations', async () => {
    const fixture = TestBed.createComponent(ProfielPage);
    await fixture.whenStable();
    await expectNoA11yViolations(fixture.nativeElement);
  });
});
