import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/service/auth-service.service'; // Feltételezem, hogy itt van az AuthService
import { Observable } from 'rxjs';
import { User } from '../../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  standalone: true, // Feltételezem, hogy standalone komponens
  imports: [CommonModule], // CommonModule hozzáadása
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
  }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout().subscribe({
      next: () => console.log('Sikeres kijelentkezés'),
      error: (err) => console.error('Hiba a kijelentkezés során:', err)
    });
  }

}