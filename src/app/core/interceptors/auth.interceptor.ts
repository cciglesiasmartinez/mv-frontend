import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const token = auth.getToken();

  console.log('🔍 INTERCEPTOR para:', req.url);
  console.log('🎫 Token disponible:', token ? 'SÍ' : 'NO');
  if (token) {
    console.log('🎫 Token (primeros 20 chars):', token.substring(0, 20) + '...');
  }
  console.log('🍪 withCredentials original:', req.withCredentials); 

  // Clona la request original y añade Authorization si hay token
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  // Solo los endpoints de autenticación necesitan cookies
  const endpointsRequiringCookies = ['/auth/login', '/auth/refresh', '/auth/logout'];
  const shouldSendCookies = endpointsRequiringCookies.some(url => req.url.includes(url));
  if (shouldSendCookies) {
    authReq = authReq.clone({ withCredentials: true });
  }

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        return auth.getRefreshAccessToken().pipe(
          switchMap(() => {
            const newToken = auth.getToken();
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` }
            });
            return next(retryReq);
          }),
          catchError(refreshErr => {
            console.error('Refresh token inválido:', refreshErr);
            return throwError(() => refreshErr);
          })
        );
      }
      return throwError(() => err);
    })
  );
};