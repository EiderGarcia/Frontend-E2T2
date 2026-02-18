import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment';

export interface Appointment {
  id?: number;
  seat: number;
  date: string;
  start_time: string;
  end_time: string;
  comment?: string;
  name: string;
  client?: { id: number };
}

export interface AppointmentServiceDTO {
  id: number;
  comment?: string;
  appointmentId: number;
  appointmentDate: string;
  appointmentStartTime: string;
  appointmentEndTime: string;
  serviceId: number;
  serviceName: string;
  duration: number;
}

@Injectable({ providedIn: 'root' })
export class AppointmentApiService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${environment.apiUrl}/api/appointments`);
  }

  add(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${environment.apiUrl}/api/appointments`, appointment);
  }

  update(id: number, appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(`${environment.apiUrl}/api/appointments/${id}`, appointment);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/appointments/${id}`);
  }

  getServicesByAppointmentId(appointmentId: number): Observable<AppointmentServiceDTO[]> {
    return this.http.get<AppointmentServiceDTO[]>(
      `${environment.apiUrl}/api/appointment-services/byAppointmentId/${appointmentId}`
    );
  }
}