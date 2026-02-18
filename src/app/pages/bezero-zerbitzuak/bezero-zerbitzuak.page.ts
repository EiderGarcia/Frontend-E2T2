import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ServiceEntityService, ServiceEntity } from '../../services/API/service';
import { SectionTitleComponent } from '../../components/section-title/section-title.component';
import { StateDisplayComponent } from '../../components/state-display/state-display.component';

@Component({
  selector: 'app-bezero-zerbitzuak',
  templateUrl: './bezero-zerbitzuak.page.html',
  styleUrls: ['./bezero-zerbitzuak.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [SectionTitleComponent, StateDisplayComponent],
})
export class BezeroZerbitzuakPage implements OnInit {
  schedule = [
    { name: 'Astelehena', open: true,  hours: '09:00 - 14:00' },
    { name: 'Asteartea',  open: true,  hours: '09:00 - 14:00' },
    { name: 'Asteazkena', open: true,  hours: '09:00 - 12:00' },
    { name: 'Osteguna',   open: true,  hours: '09:00 - 14:00' },
    { name: 'Ostirala',   open: true,  hours: '09:00 - 14:00' },
    { name: 'Larunbata',  open: false },
    { name: 'Igandea',    open: false },
  ];

  services: ServiceEntity[] = [];
  loading = true;
  error = '';

  constructor(private serviceApi: ServiceEntityService) {}

  ngOnInit() {
    this.serviceApi.getAll().subscribe({
      next: (data) => { this.services = data; this.loading = false; },
      error: () => { this.error = 'Could not load services.'; this.loading = false; }
    });
  }
}