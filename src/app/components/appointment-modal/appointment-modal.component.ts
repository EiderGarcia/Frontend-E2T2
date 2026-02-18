import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Appointment, AppointmentApiService, AppointmentServiceDTO } from '../../services/API/appointment';
import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';
import { StateDisplayComponent } from '../state-display/state-display.component';

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',  // ← matches your actual folder
  styleUrls: ['./appointment-modal.component.scss'],
  standalone: true,
  imports: [ModalWrapperComponent, StateDisplayComponent],
})
export class AppointmentModalComponent implements OnInit {
  @Input() appointment: Appointment | null = null;
  @Output() closed = new EventEmitter<void>();

  services: AppointmentServiceDTO[] = [];
  loading = true;

  constructor(private appointmentApi: AppointmentApiService) {}

  ngOnInit() {
    if (this.appointment?.id) {
      this.appointmentApi.getServicesByAppointmentId(this.appointment.id).subscribe({
        next: (data) => { this.services = data; this.loading = false; },
        error: () => { this.loading = false; }
      });
    } else {
      this.loading = false;
    }
  }

  close() { this.closed.emit(); }
}