import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment';

export interface Consumable {
  id?: number; // optional, auto-generated
  name: string;
  brand: string;
  batch: string;
  stock: number;
  min_stock?: number;
  expiration_date: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConsumableService {
  constructor(private http: HttpClient) {} 

  getAll(): Observable<Consumable[]> {
    return this.http.get<Consumable[]>(`${environment.apiUrl}/consumables`);
  }

  add(consumable: Consumable): Observable<Consumable> {
    return this.http.post<Consumable>(`${environment.apiUrl}/consumables`, consumable);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/consumables/${id}`);
  }

  update(id: number, consumable: Consumable): Observable<Consumable> {
    return this.http.put<Consumable>(`${environment.apiUrl}/consumables/${id}`, consumable);
  }
}
