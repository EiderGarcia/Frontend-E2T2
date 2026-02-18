import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment';

export interface User {
  id?: number;
  username: string;
  email: string;
  rol: string;
  password?: string;
}

@Injectable({ providedIn: 'root' })
export class UserApiService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/api/users`);
  }

  add(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/api/users`, user);
  }

  update(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/api/users/${id}`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/users/${id}`);
  }
}