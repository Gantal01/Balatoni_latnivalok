import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [MatCardModule, RouterLink],
  styles: []
})
export class HomeComponent {

  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

}