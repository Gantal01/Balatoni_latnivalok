import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Attraction } from '../../models/attraction.model';
import { Location } from '../../models/location.model';
import { attractions, locations } from '../../data/data.data';
import { AttractionCardComponent } from '../../shared/attraction-card/attraction-card.component';

@Component({
  selector: 'app-eszak',
  standalone: true,
  imports: [MatCardModule, CommonModule, AttractionCardComponent],
  template: `
    <div class="container">
      <h2>Északi part látnivalói</h2>
      <div class="card-container">
        <app-attraction-card
          *ngFor="let attraction of northAttractions"
          [attraction]="attraction"
          (eventsToggled)="onEventsToggled($event)">
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
export class EszakComponent implements OnInit {
  northAttractions: Attraction[] = [];

  ngOnInit(): void {
    const northLocations = locations.filter(location => location.region === 'north');
    this.northAttractions = attractions.filter(attraction =>
      northLocations.some(location => location.id === attraction.locationId)
    );
  }

  onEventsToggled(event: { attractionId: number, isOpen: boolean }): void {
    const attraction = this.northAttractions.find(attr => attr.id === event.attractionId);
    console.log(`Események ${event.isOpen ? 'lenyitva' : 'bezárva'} a következő látnivalónál: ${attraction?.name}`);
  }
}