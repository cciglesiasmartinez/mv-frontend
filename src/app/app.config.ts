import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@core/interceptors/auth.interceptor';
import { initializeAuth } from '@core/initializers/auth.initializer';
import { Auth } from '@core/services/auth';
import { PLATFORM_ID } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withDebugTracing()), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [Auth, PLATFORM_ID],
      multi: true 
    }
  ]
};
