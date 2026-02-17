import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { logOutOutline, bookOutline, calendarOutline, cut } from 'ionicons/icons';

import { BezeroZerbitzuakPage } from '../bezero-zerbitzuak/bezero-zerbitzuak.page';
import { BezeroZitakPage } from '../bezero-zitak/bezero-zitak.page';
import { BezeroHistorialaPage } from '../bezero-historiala/bezero-historiala.page';

@Component({
  selector: 'app-bezero-home',
  templateUrl: './bezero-home.page.html',
  styleUrls: ['./bezero-home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonIcon,
    BezeroZerbitzuakPage,
    BezeroZitakPage,
    BezeroHistorialaPage,
  ],
})
export class BezeroHomePage {
  activePage = 'dashboard';

  logOutIcon = logOutOutline;
  zitakIcon = calendarOutline;
  historyIcon = bookOutline;
  zerbitzuIcon = cut;

  constructor(private router: Router) {
    addIcons({ logOutOutline, bookOutline, calendarOutline, cut });
  }

  setPage(page: string) {
    this.activePage = page;
  }

  logout() {
    localStorage.removeItem('userRole');
    this.router.navigate(['/']);
  }
}