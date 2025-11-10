import { Component, inject, signal } from '@angular/core';
import { Auth } from '@core/services/auth';
import { firstValueFrom } from 'rxjs';

/**
 * Componente para mostrar la información del usuario autenticado.
 */
@Component({
  selector: 'app-me',
  imports: [],
  templateUrl: './me.html',
  styleUrl: './me.css',
})
export class Me {
  private authService = inject(Auth);
  user = signal<any | null>(null);
  error = signal<string | null>(null);

  constructor() {
    this.authService.getUserInfo().subscribe({
      next: (data) => this.user.set(data),
      error: (err) => {
        console.error('Error al cargar /me:', err);
        this.error.set('No autorizado o error en servidor');
      }
    });
  }
}
