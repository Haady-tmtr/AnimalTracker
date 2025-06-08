import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private server = 'http://localhost:8082/api';
  private _token?: string;
  private _email?: string;
  private _error: boolean = false;

  constructor(private http: HttpClient) {}

  // Logout
  logout() {
    this._token = undefined;
    this._email = undefined;
    localStorage.removeItem('token');
  }

  // Error handling
  public reset_error() { this._error = false }
  public get error() { return this._error }

  // Auth status
  public get isAuthentified(): boolean {
    return !!this._token;
  }

  public get token(): string {
    return this._token || '';
  }

  public get email(): string {
    return this._email || '';
  }

  getUserRole(): string {
    // Retourne le rôle de l'utilisateur connecté
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role || '';
  }

  // Login method
  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(`${this.server}/login`, { email, password }).pipe(
      tap({
        next: response => {
          if (response?.token) {
            this._token = response.token;
            const payload = JSON.parse(atob(this._token.split('.')[1]));
            this._email = payload.email || payload.username || payload.name;
            this._error = false;
            localStorage.setItem('token', this._token);
          } else {
            this._error = true;
          }
        },
        error: () => { this._error = true }
      }),
      map(response => !!response?.token)
    );
  }

  // Auto login from localStorage
  autoLogin(): void {
    console.log('Auto-login appelé');
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this._token = storedToken;
      const payload = JSON.parse(atob(storedToken.split('.')[1]));
      this._email = payload.email || payload.username || payload.name;
    }
  }


}
