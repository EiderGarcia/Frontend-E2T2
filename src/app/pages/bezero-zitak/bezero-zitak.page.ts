import { Component, OnInit } from '@angular/core';
import { AppointmentApiService, Appointment } from '../../services/API/appointment';
import { AuthService } from '../../services/API/auth';
import { SectionTitleComponent } from '../../components/section-title/section-title.component';
import { StateDisplayComponent } from '../../components/state-display/state-display.component';
import { AppointmentCardComponent } from '../../components/appointment-card/appointment-card.component';

@Component({
  selector: 'app-bezero-zitak',
  templateUrl: './bezero-zitak.page.html',
  styleUrls: ['./bezero-zitak.page.scss'],
  standalone: true,
  imports: [SectionTitleComponent, StateDisplayComponent, AppointmentCardComponent],
})
export class BezeroZitakPage implements OnInit {
  appointments: Appointment[] = [];
  loading = true;
  error = '';

  constructor(
    private appointmentApi: AppointmentApiService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    const clientId = user?.client?.id;
    const today = new Date().toISOString().split('T')[0];

    this.appointmentApi.getAll().subscribe({
      next: (data) => {
        const mine = clientId ? data.filter(a => a.client?.id === clientId) : data;
        this.appointments = mine.filter(a => a.date >= today);
        this.loading = false;
      },
      error: () => { this.error = 'Could not load appointments.'; this.loading = false; }
    });
  }
}