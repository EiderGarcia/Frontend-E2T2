import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment';

export interface Schedule {
  id?: number;
  day: number;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  group?: { id: number };
}

@Injectable({ providedIn: 'root' })
export class ScheduleApiService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${environment.apiUrl}/api/schedules`);
  }

  add(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(`${environment.apiUrl}/api/schedules`, schedule);
  }

  update(id: number, schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(`${environment.apiUrl}/api/schedules/${id}`, schedule);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/schedules/${id}`);
  }
}