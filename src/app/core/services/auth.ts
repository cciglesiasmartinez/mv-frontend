import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, RefreshAccessTokenResponse, RegisterRequest } from '../../features/auth/dto';
 
/**
 * Servicio de autenticación para manejar el login y registro de usuarios.
 */
@Injectable({
  providedIn: 'root',
})
export class Auth {

  /**
   * URL base de la API de autenticación.
   */
  private readonly apiUrl = 'http://localhost:8081/auth';

  /**
   * Token de autenticación almacenado.
   */
  private token: string | null = null;

  /**
   * Constructor del servicio Auth.
   * @param httpClient Cliente HTTP inyectado por Angular
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Obtiene el token almacenado.
   * @returns `string | null` con el token de autenticación
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Realiza el login de un usuario.
   * @param loginRequest DTO para la solicitud de login
   * @returns `Observable<LoginResponse>` con la respuesta del servidor
   */
  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, 
      loginRequest, { withCredentials: true }).pipe(tap(response => { this.token = response.data.token; }));
  }
 
  /**
   * Registra un nuevo usuario.
   * @param registerRequest DTO para la solicitud de registro
   * @returns `Observable<any>` con la respuesta del servidor 
   */
  register(registerRequest: RegisterRequest): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/register`, registerRequest)
  }

  /**
   * Obtiene la información del usuario autenticado.
   * @returns `Observable<any>` con la información del usuario
   */
  getMe(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/me`)
    .pipe(tap(response => console.log('Respuesta de getMe:', response)));
  }

  /**
   * Refresca el token de acceso utilizando el refresh token.
   * @returns `Observable<RefreshAccessTokenResponse>` con la nueva información del token
   */
  getRefreshAccessToken(): Observable<RefreshAccessTokenResponse> {
    return this.httpClient.post<RefreshAccessTokenResponse>(`${this.apiUrl}/refresh`, {}, { withCredentials: true })
    .pipe(tap(response => {
      this.token = response.data.token;
      console.log('Refresh token, nuevo JWT:', this.token)
    }))
  }

}
