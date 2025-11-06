import { Component } from '@angular/core';
import { signal, computed, WritableSignal } from "@angular/core";

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  email = signal('');
  password = signal('');

  loginResult = signal<{token:string, username: string} | null>(null);

  isValid = computed(
    () => this.email().trim().length > 0 && this.password().trim().length > 0
  );

  async onSubmit() {
    if (!this.isValid()) {
      return;
    }
    try {
      const payload = { email: this.email(), password: this.password() };
      const res = await fetch('http://localhost:8081/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        throw new Error('Login fallido');
      }
      const data = await res.json();
      // actualizar signal con los datos
      console.log(data)
      this.loginResult.set(data.data);
    } catch(error) {
      console.error('Error en la petición:', error);
      this.loginResult.set(null);
    }
  }

}
