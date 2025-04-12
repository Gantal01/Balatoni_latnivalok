import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Attraction } from '../../models/attraction.model';
import { Location } from '../../models/location.model';
import { attractions, locations } from '../../data/data.data';
import { AttractionCardComponent } from '../../shared/attraction-card/attraction-card.component';

@Component({
  selector: 'app-del',
  standalone: true,
  imports: [MatCardModule, CommonModule, AttractionCardComponent],
  template: `
    <div class="container">
      <h2>Déli part látnivalói</h2>
      <div class="card-container">
        <app-attraction-card
          *ngFor="let attraction of southAttractions"
          [attraction]="attraction">
        </app-attraction-card>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 16px;
        text-align: center;
      }
      .card-container {
        display: flex;
        justify-content: center;
        gap: 16px;
        flex-wrap: wrap;
      }
    `
  ]
})
export class DelComponent implements OnInit {
  southAttractions: Attraction[] = [];

  ngOnInit(): void {
    const southLocations = locations.filter(location => location.region === 'south');
    this.southAttractions = attractions.filter(attraction =>
      southLocations.some(location => location.id === attraction.locationId)
    );
  }
}