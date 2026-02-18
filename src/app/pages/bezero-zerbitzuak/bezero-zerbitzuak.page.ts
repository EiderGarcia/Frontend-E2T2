import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';

interface ScheduleDay {
  name: string;
  open: boolean;
  hours?: string;
}

interface Service {
  name: string;
  price: number;
  category: string;
}

@Component({
  selector: 'app-bezero-zerbitzuak',
  templateUrl: './bezero-zerbitzuak.page.html',
  styleUrls: ['./bezero-zerbitzuak.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, CommonModule],
})
export class BezeroZerbitzuakPage {

  schedule: ScheduleDay[] = [
    { name: 'Astelehena', open: true,  hours: '09:00 - 14:00' },
    { name: 'Asteartea',  open: true,  hours: '09:00 - 14:00' },
    { name: 'Asteazkena', open: true,  hours: '09:00 - 12:00' },
    { name: 'Osteguna',   open: true,  hours: '09:00 - 14:00' },
    { name: 'Ostirala',   open: true,  hours: '09:00 - 14:00' },
    { name: 'Larunbata',  open: false },
    { name: 'Igandea',    open: false },
  ];

  // Each category now has a value AND a display label — no pipe gymnastics needed
  categories: { value: string; label: string }[] = [
    { value: 'all',       label: 'Guztiak'   },
    { value: 'oso-luzea', label: 'Oso Luzea' },
    { value: 'luzea',     label: 'Luzea'     },
    { value: 'ertaina',   label: 'Ertaina'   },
    { value: 'laburra',   label: 'Laburra'   },
  ];

  services: Service[] = [
    { name: 'Ilea moztu',                         price: 8,  category: 'laburra'   },
    { name: 'Tintura',                            price: 25, category: 'ertaina'   },
    { name: 'Ilea moztu + Tintura',               price: 30, category: 'luzea'     },
    { name: 'Ilea moztu + Tintura + Tratamendua', price: 40, category: 'oso-luzea' },
  ];

  selectedCategory = 'all';
  filteredServices: Service[] = this.services;

  selectCategory(value: string): void {
    this.selectedCategory = value;
    this.filteredServices = value === 'all'
      ? this.services
      : this.services.filter(s => s.category === value);
  }

  // Helper so the template can look up a label by value
  getCategoryLabel(value: string): string {
    return this.categories.find(c => c.value === value)?.label ?? value;
  }
}