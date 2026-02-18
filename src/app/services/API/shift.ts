import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment';

export interface Shift {
  id?: number;
  type: string;
  student?: { id: number };
}

@Injectable({ providedIn: 'root' })
export class ShiftApiService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Shift[]> {
    return this.http.get<Shift[]>(`${environment.apiUrl}/api/shifts`);
  }

  add(shift: Shift): Observable<Shift> {
    return this.http.post<Shift>(`${environment.apiUrl}/api/shifts`, shift);
  }

  update(id: number, shift: Shift): Observable<Shift> {
    return this.http.put<Shift>(`${environment.apiUrl}/api/shifts/${id}`, shift);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/shifts/${id}`);
  }
}