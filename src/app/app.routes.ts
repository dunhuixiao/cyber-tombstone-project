import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'memorial/:id',
    loadComponent: () => import('./pages/memorial/memorial.component').then(m => m.MemorialComponent),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
