// src/app/register/register.component.ts
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
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      displayName: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, displayName } = this.registerForm.value;
      this.authService.register(email, password, displayName).subscribe({
        next: () => {
          this.snackBar.open('Registration successful', 'Close', { duration: 3000 });
          this.router.navigate(['/']);
        },
        error: (err) => {
          let message = 'Registration failed';
          if (err.code === 'auth/email-already-in-use') {
            message = 'This email is already registered';
          } else if (err.code === 'auth/invalid-email') {
            message = 'Invalid email address';
          } else if (err.code === 'auth/weak-password') {
            message = 'Password is too weak';
          }
          this.snackBar.open(message, 'Close', { duration: 3000 });
        }
      });
    }
  }
}