import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'login',
    renderMode: RenderMode.Prerender  // Login es estático
  },
  {
    path: 'register',
    renderMode: RenderMode.Prerender  // Register es estático
  },
  {
    path: 'items/**',
    renderMode: RenderMode.Server  // ← DINÁMICO: se renderiza según request
  },
  {
    path: 'me',
    renderMode: RenderMode.Server  // Requiere autenticación
  },
  {
    path: '**',
    renderMode: RenderMode.Server  // Todo lo demás, dinámico
  }
];
