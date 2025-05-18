import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/service/auth-service.service';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  user$: Observable<User | null>;
  editMode = false;
  editForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.user$ = this.authService.user$;
    this.editForm = this.fb.group({
      displayName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.editForm.patchValue({ displayName: user.displayName });
      }
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  saveProfile(): void {
    if (this.editForm.valid) {
      const { displayName } = this.editForm.value;
      this.authService.updateUserProfile(displayName).subscribe({
        next: () => {
          this.snackBar.open('Profil sikeresen frissítve!', 'OK', { duration: 3000 });
          this.toggleEditMode();
        },
        error: (err) => {
          console.error('Hiba a profil frissítése során:', err);
          this.snackBar.open('Hiba történt a profil frissítése közben.', 'OK', { duration: 3000 });
        }
      });
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.snackBar.open('Sikeres kijelentkezés', 'OK', { duration: 3000 });
        this.router.navigate(['/home']);
      },
      error: (err) => console.error('Hiba a kijelentkezés során:', err)
    });
  }

  deleteProfile(): void {
    if (confirm('Biztosan törölni szeretné a profilját? Ez a művelet nem visszavonható.')) {
      this.authService.deleteUserProfile().subscribe({
        next: () => {
          this.snackBar.open('Profil sikeresen törölve!', 'OK', { duration: 3000 });
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Hiba a profiltörlés során:', err);
          this.snackBar.open('Hiba történt a profil törlése közben.', 'OK', { duration: 3000 });
        }
      });
    }
  }
}