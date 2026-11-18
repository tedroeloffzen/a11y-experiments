import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'leerlingen' },
  {
    path: 'leerlingen',
    loadComponent: () =>
      import('./pages/leerlingen/leerlingen.page').then((m) => m.LeerlingenPage),
  },
  {
    path: 'profiel',
    loadComponent: () => import('./pages/profiel/profiel.page').then((m) => m.ProfielPage),
  },
  {
    path: 'experiment',
    loadComponent: () =>
      import('./pages/experiment/experiment.page').then((m) => m.ExperimentPage),
  },
];
