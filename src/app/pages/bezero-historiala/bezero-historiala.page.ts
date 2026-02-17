import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface HistoryService {
  name: string;
  price: number;
}

interface HistoryItem {
  date: string;
  time: string;
  duration: string;
  services: HistoryService[];
  total: number;
}

@Component({
  selector: 'app-bezero-historiala',
  templateUrl: './bezero-historiala.page.html',
  styleUrls: ['./bezero-historiala.page.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class BezeroHistorialaPage {
  history: HistoryItem[] = [
    {
      date: 'Osteguna, 26 Ots',
      time: '11:00',
      duration: '45min',
      services: [
        { name: 'Ilea Moztu', price: 8 },
        { name: 'Tintura',    price: 25 },
      ],
      total: 36,
    },
    {
      date: 'Jueves, 25 Feb',
      time: '11:00',
      duration: '45min',
      services: [
        { name: 'Ilea Moztu', price: 8 },
        { name: 'Tintura',    price: 25 },
      ],
      total: 36,
    },
  ];
}