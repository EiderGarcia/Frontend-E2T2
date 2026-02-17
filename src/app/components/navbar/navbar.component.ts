import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonToolbar,
  IonButtons,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    IonButton,
    IonToolbar,
    IonButtons,
  ],
})
export class NavbarComponent {
  guestButtons: any;
  constructor(private router: Router) {}

  @Input() position: 'top' | 'bottom' = 'top';
  @Output() selectionChanged = new EventEmitter<string>();
  ikaslebuttons = [
    { label: 'Equipments', value: 'equipments' },
    { label: 'Consumables', value: 'consumables' },
  ];

  onSelect(value: string) {
    this.selectionChanged.emit(value);
  }
  logout() {
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}
