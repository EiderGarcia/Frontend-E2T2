import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment';

export interface ServiceEntity {
  id?: number;
  name: string;
  price: number;
  home_price: number;
  duration: number;
}

@Injectable({ providedIn: 'root' })
export class ServiceEntityService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ServiceEntity[]> {
    return this.http.get<ServiceEntity[]>(`${environment.apiUrl}/api/services`);
  }

  add(service: ServiceEntity): Observable<ServiceEntity> {
    return this.http.post<ServiceEntity>(`${environment.apiUrl}/api/services`, service);
  }

  update(id: number, service: ServiceEntity): Observable<ServiceEntity> {
    return this.http.put<ServiceEntity>(`${environment.apiUrl}/api/services/${id}`, service);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/services/${id}`);
  }
}