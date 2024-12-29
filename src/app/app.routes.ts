import { Routes } from '@angular/router';
import { ApiDataResolver } from './prod.service';

export const routes: Routes = [
  {
    path: 'prod',
    loadComponent: () =>
      import('./prod-box/prod-box.component').then((p) => p.ProdBoxComponent),
    resolve: {
      data: ApiDataResolver,
    },
  },
];
