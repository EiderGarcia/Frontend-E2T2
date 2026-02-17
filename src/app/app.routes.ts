import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard/auth-guard';

// app.routes.ts
export const routes: Routes = [
  {
    path: 'ikasle-home',
    loadComponent: () =>
      import('./pages/ikasle-home/ikasle-home.page').then(m => m.IkasleHomePage),
    canActivate: [AuthGuard],
  },
  {
    path: 'bezero-home',
    loadComponent: () =>
      import('./pages/bezero-home/bezero-home.page').then(m => m.BezeroHomePage),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];