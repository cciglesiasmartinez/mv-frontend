import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { of, catchError } from 'rxjs';
import { Auth } from '../services/auth';

export function initializeAuth(authService: Auth, platformId: Object) {
  return () => {
    if (!isPlatformBrowser(platformId)) {
      return of(null);
    }

    if (authService.getToken()) {
      return of(null);
    }

    return authService.getRefreshAccessToken().pipe(
      catchError(error => {
        return of(null);
      })
    );
  };
}