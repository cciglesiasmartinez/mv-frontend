import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender  // Index es estático y público
  },
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
    renderMode: RenderMode.Client  // ← Rutas autenticadas: solo cliente
  },
  {
    path: 'me',
    renderMode: RenderMode.Client  // Requiere autenticación: solo cliente
  },
  {
    path: '**',
    renderMode: RenderMode.Client  // Por defecto, cliente
  }
];
