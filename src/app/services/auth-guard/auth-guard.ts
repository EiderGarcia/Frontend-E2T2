import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const role = localStorage.getItem('userRole');
    if (!role) return this.router.createUrlTree(['/']);

    const path = route.routeConfig?.path ?? '';
    if (path.includes('ikasle-home') && role !== 'ikasle') {
      return this.router.createUrlTree(['/']);
    }
    if (path.includes('bezero-home') && role !== 'bezero') {
      return this.router.createUrlTree(['/']);
    }
    return true;
  }
}
