import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../services/API/appointment';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class AppointmentCardComponent {
  @Input() appointment!: Appointment;
}