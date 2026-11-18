import { TestBed } from '@angular/core/testing';
import { CijferInvoer } from './cijfer-invoer';

describe('CijferInvoer', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CijferInvoer] }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CijferInvoer);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
