import { Component, HostListener } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth-service.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  isSidenavOpen = false;
  isLargeScreen = false;
  user$: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isLargeScreen = window.innerWidth >= 768;
    this.isSidenavOpen = this.isLargeScreen;
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  closeSidenav() {
    if (!this.isLargeScreen) {
      this.isSidenavOpen = false;
    }
  }

  logout() {
    this.authService.logout().subscribe();
  }
}
