import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const token = auth.getToken();
  
  let authReq = req.clone({
    withCredentials: true, // Asegura que todas las peticiones lleven cookies
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {} // Añade el token si está disponible
  });

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