import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authguardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('user'); // Replace with real check

  return isLoggedIn ? true : router.createUrlTree(['/login']);
  };