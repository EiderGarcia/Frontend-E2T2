import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment';

export interface User {
  id?: number;
  username?: string;
  email?: string;
  rol?: string;
  client?: any;
  student?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/api/users/login`, {
      username,
      password  // plain text — backend does the SHA-256 hashing
    });
  }

  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userRole', user.rol ?? '');
  }

  getUser(): User | null {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }

  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
  }
}