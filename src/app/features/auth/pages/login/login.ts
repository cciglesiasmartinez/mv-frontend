import { Component } from '@angular/core';
import { signal, computed, WritableSignal, inject } from "@angular/core";
import { Auth } from '@core/services/auth';
import { LoginRequest, LoginResponse } from '../../dto/';
import { firstValueFrom } from 'rxjs';

/**
 * Componente de login para la autenticación de usuarios.
 */
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  /**
   * Señales para el email, la contraseña y el resultado del login.
   */
  email = signal('');
  password = signal('');
  loginResult = signal<LoginResponse | null>(null);

  /**
   * Indica si el formulario es válido.
   */
  isValid = computed(
    () => this.email().trim().length > 0 && this.password().trim().length > 0
  );

  /**
   * Servicio de autenticación inyectado.
   */
  private authService = inject(Auth);

  /**
   * Maneja el envío del formulario de login.
   * @returns `Promise<void>`
   */
  async onSubmit(): Promise<void> {
    if (!this.isValid()) return;
    const request: LoginRequest = { email: this.email(), password: this.password() };
    try {
      const response = await firstValueFrom(this.authService.login(request));
      this.loginResult.set(response);
      console.log('Usuario logueado:', response);
    } catch (error) {
      console.error('Error en la petición:', error);
      this.loginResult.set(null);
    }
  }

  async onSubmitLogout(): Promise<void> {
    console.log("Callin onSubmitLogout");
    try {
      const response = await firstValueFrom(this.authService.logout());
      this.loginResult.set(null);
      console.log('Usuario deslogueado:', response)
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  }

}
