import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Auth } from '../services/auth';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  // Solo se ejecuta en cliente con RenderMode.Client
  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
