import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse, RefreshAccessTokenResponse, RegisterRequest, GetUserResponse } from '../../features/auth/dto';
 
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
   * Token de autenticación almacenado en memoria.
   */
  private token: string | null = null;

  /**
   * Constructor del servicio Auth.
   * @param httpClient Cliente HTTP inyectado por Angular
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Obtiene el token almacenado en memoria.
   * @returns `string | null` con el token de autenticación
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Verifica si el usuario está autenticado.
   * @returns `boolean` true si hay token
   */
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Realiza el login de un usuario.
   * @param loginRequest DTO para la solicitud de login
   * @returns `Observable<LoginResponse>` con la respuesta del servidor
   */
  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, 
      loginRequest, { withCredentials: true }).pipe(tap(response => { 
        this.token = response.data.token;
      }));
  }
 
  /**
   * Registra un nuevo usuario.
   * @param registerRequest DTO para la solicitud de registro
   * @returns `Observable<any>` con la respuesta del servidor 
   */
  register(registerRequest: RegisterRequest): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/register`, registerRequest);
  }

  logout(): Observable<any> {
    this.token = null;
    return this.httpClient.post(`${this.apiUrl}/logout`, {}, {withCredentials: true});
  }

  /**
   * Obtiene la información del usuario autenticado.
   * @returns `Observable<any>` con la información del usuario
   */
  getUserInfo(): Observable<GetUserResponse> {
    return this.httpClient.get<GetUserResponse>(`${this.apiUrl}/me`);
  }

  /**
   * Refresca el token de acceso utilizando el refresh token.
   * @returns `Observable<RefreshAccessTokenResponse>` con la nueva información del token
   */
  getRefreshAccessToken(): Observable<RefreshAccessTokenResponse> {
    return this.httpClient.post<RefreshAccessTokenResponse>(`${this.apiUrl}/refresh`, {}, { withCredentials: true })
    .pipe(tap(response => {
      this.token = response.data.token;
    }))
  }
  
}
