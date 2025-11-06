import { Component } from '@angular/core';
import { signal, computed } from "@angular/core";

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = signal('');
  password = signal('');

  isValid = computed(
    () => this.email().trim().length > 0 && this.password().trim().length > 0
  );

  onSubmit() {
    if (this.isValid()) {
      console.log('Login con:', { email: this.email(), password: this.password() })
      // Lógica de login
      const payload = {
        email: this.email(),
        password: this.password()
      }
      fetch('http://localhost:8081/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(response => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json();
      }).then(data => {
      console.log('Respuesta del servidor:', data);
      // guarda token, navega a dashboard, etc.
      }).catch(error => {
      console.error('Error en la petición:', error);
      // muestra mensaje de error al usuario
    });
    }
  }
}
