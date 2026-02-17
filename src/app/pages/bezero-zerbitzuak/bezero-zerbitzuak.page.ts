import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // CUSTOM_ELEMENTS_SCHEMA lets us use ion-page
import { CommonModule } from '@angular/common';
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // allows <ion-page> without needing to import it
  imports: [CommonModule],
})
export class BezeroZerbitzuakPage {
  schedule: ScheduleDay[] = [
    { name: 'Astelehena', open: true, hours: '09:00 - 17:00' },
    { name: 'Asteartea', open: true, hours: '09:00 - 17:00' },
    { name: 'Asteazkena', open: true, hours: '09:00 - 17:00' },
    { name: 'Osteguna', open: true, hours: '09:00 - 17:00' },
    { name: 'Ostirala', open: true, hours: '09:00 - 17:00' },
    { name: 'Larunbata', open: false },
    { name: 'Igandea', open: false },
  ];

  categories: { value: string; label: string }[] = [
    { value: 'all',       label: 'Guztiak'   },
    { value: 'oso-luzea', label: 'Oso Luzea' },
    { value: 'luzea',     label: 'Luzea'     },
    { value: 'ertaina',   label: 'Ertaina'   },
    { value: 'laburra',   label: 'Laburra'   },
  ];

  services: Service[] = [
    { name: 'Ilea moztu', price: 8, category: 'laburra' },
    { name: 'Tintura', price: 25, category: 'ertaina' },
    { name: 'Ilea moztu + Tintura', price: 30, category: 'luzea' },
    {
      name: 'Ilea moztu + Tintura + Tratamendua',
      price: 40,
      category: 'oso-luzea',
    },
  ];

  selectedCategory = 'all';
  filteredServices: Service[] = this.services;

  selectCategory(cat: string): void {
    console.log('clicked:', cat);  
    this.selectedCategory = cat;
    this.filteredServices =
      cat === 'all'
        ? this.services
        : this.services.filter((s) => s.category === cat);
  }

  getCategoryLabel(value: string): string {
    return this.categories.find(c => c.value === value)?.label ?? value;
  }
}
