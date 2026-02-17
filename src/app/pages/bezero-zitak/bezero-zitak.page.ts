import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';

interface AppointmentService {
  name: string;
  price: number;
}

interface Appointment {
  date: string;
  time: string;
  duration: string;       // e.g. '45min'
  services: AppointmentService[];
  total: number;
}

@Component({
  selector: 'app-bezero-zitak',
  templateUrl: './bezero-zitak.page.html',
  styleUrls: ['./bezero-zitak.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule],
})
export class BezeroZitakPage {
  appointments: Appointment[] = [
    {
      date: 'Osteguna, 25 Ots',
      time: '9:00',
      duration: '45min',
      services: [
        { name: 'Ilea Moztu', price: 8 },
        { name: 'Tintura',    price: 25 },
      ],
      total: 36,
    },
  ];
}