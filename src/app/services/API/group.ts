import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment';

export interface Group {
  id?: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class GroupApiService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.apiUrl}/api/groups`);
  }

  add(group: Group): Observable<Group> {
    return this.http.post<Group>(`${environment.apiUrl}/api/groups`, group);
  }

  update(id: number, group: Group): Observable<Group> {
    return this.http.put<Group>(`${environment.apiUrl}/api/groups/${id}`, group);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/groups/${id}`);
  }
}