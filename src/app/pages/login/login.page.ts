import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonInput,
  IonItem,
  IonContent,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

interface User {
  email: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonButton, IonInput, IonItem, IonContent, FormsModule],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  users: User[] = [
    { email: 'ikasle@email.com', password: '1234', role: 'ikasle' },
    { email: 'bezero@email.com', password: '1234', role: 'bezero' },
  ];

  constructor(private router: Router) {}

  login() {
    const user = this.users.find(
      (u) => u.email === this.email && u.password === this.password,
    );

    if (!user) {
      alert('Invalid credentials');
      return;
    }

    localStorage.setItem('userRole', user.role);

    if (user.role === 'ikasle') {
      this.router.navigate(['/ikasle-home']);
    } else if (user.role === 'bezero') {
      this.router.navigate(['/bezero-home']);
    }
  }

  enterAsGuest() {
    console.log('Entering as guest');
    this.router.navigate(['/guest-home']);
  }
}
