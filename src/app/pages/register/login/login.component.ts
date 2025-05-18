import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/service/auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.snackBar.open('Bejelentkezés sikeres', 'Bezár', { duration: 3000 });
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          let message = 'Bejelentkezés sikertelen';
          if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
            message = 'Érvénytelen email vagy jelszó';
          } else if (err.code === 'auth/invalid-email') {
            message = 'Érvénytelen email cím';
          }
          this.snackBar.open(message, 'Bezár', { duration: 3000 });
        }
      });
    }
  }
}