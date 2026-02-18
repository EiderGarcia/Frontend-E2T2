import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/API/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [],
})
export class NavbarComponent {
  @Input() position: 'top' | 'bottom' = 'top';
  @Output() selectionChanged = new EventEmitter<string>();

  selectedValue = 'Groups';

  ikaslebuttons = [
  { label: 'Services',     value: 'services'     },
  { label: 'Appointments', value: 'appointments' },
  { label: 'Clients',      value: 'clients'      },
  { label: 'Students',     value: 'students'     },
  { label: 'Users',        value: 'users'        },
  { label: 'Schedules',    value: 'schedules'    },
  { label: 'Groups',       value: 'groups'       },
  { label: 'Shifts',       value: 'shifts'       },
];

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  onSelect(value: string) {
    this.selectedValue = value;
    this.selectionChanged.emit(value);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
