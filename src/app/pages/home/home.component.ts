import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button'; 

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [MatCardModule, RouterLink, MatButtonModule, MatDividerModule],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

}