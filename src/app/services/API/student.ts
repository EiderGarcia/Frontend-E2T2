import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment';

export interface Student {
  id?: number;
  name: string;
  surname: string;
}

@Injectable({ providedIn: 'root' })
export class StudentApiService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(`${environment.apiUrl}/api/students`);
  }

  add(student: Student): Observable<Student> {
    return this.http.post<Student>(`${environment.apiUrl}/api/students`, student);
  }

  update(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${environment.apiUrl}/api/students/${id}`, student);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/students/${id}`);
  }
}