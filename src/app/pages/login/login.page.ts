import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonInput, IonItem, IonContent } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/API/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonButton, IonInput, IonItem, IonContent, FormsModule],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  login() {
    this.errorMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (user) => {
        this.authService.saveUser(user);

        if (user.rol === 'ikasle') {
          this.router.navigate(['/ikasle-home'], { replaceUrl: true });
        } else if (user.rol === 'bezero') {
          this.router.navigate(['/bezero-home'], { replaceUrl: true });
        } else {
          this.errorMessage = 'Unknown role: ' + user.rol;
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Invalid username or password';
        } else {
          this.errorMessage = 'Something went wrong, please try again';
        }
      }
    });
  }

  enterAsGuest() {
    this.router.navigate(['/guest-home']);
  }
}