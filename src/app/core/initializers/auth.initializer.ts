import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { of, catchError } from 'rxjs';
import { Auth } from '../services/auth';

export function initializeAuth(authService: Auth, platformId: Object) {
    console.log('Inicializador de Auth ejecutado');
  return () => {
    if (!isPlatformBrowser(platformId)) {
      console.log('🖥️ SSR: Saltando inicialización de auth en servidor');
      return of(null);
    }

    console.log('🌐 Cliente: Inicializando autenticación...');

    if (authService.getToken()) {
      console.log('✅ Token ya existe en memoria');
      return of(null);
    }

    console.log('🔄 Intentando refrescar token...');
    return authService.getRefreshAccessToken().pipe(
      catchError(error => {
        console.log('⚠️ No se pudo refrescar token (probablemente no hay sesión activa)');
        return of(null);
      })
    );
  };
}