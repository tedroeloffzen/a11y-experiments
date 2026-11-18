import { Component } from '@angular/core';
import { CijferInvoer } from '../../shared/cijfer-invoer/cijfer-invoer';

/**
 * Pagina waarop nieuwe componenten worden uitgeprobeerd.
 */
@Component({
  selector: 'app-experiment-page',
  imports: [CijferInvoer],
  template: `
    <h1>Experiment</h1>
    <app-cijfer-invoer />
  `,
})
export class ExperimentPage {}
