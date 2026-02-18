import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment';

export interface Client {
  id?: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  home_client: boolean;
}

@Injectable({ providedIn: 'root' })
export class ClientApiService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.apiUrl}/api/clients`);
  }

  add(client: Client): Observable<Client> {
    return this.http.post<Client>(`${environment.apiUrl}/api/clients`, client);
  }

  update(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${environment.apiUrl}/api/clients/${id}`, client);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/clients/${id}`);
  }
}