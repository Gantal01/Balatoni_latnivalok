import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Attraction } from '../../models/attraction.model';
import { Location } from '../../models/location.model';
import { attractions, locations } from '../../data/data.data';
import { AttractionCardComponent } from '../../shared/attraction-card/attraction-card.component';

@Component({
  selector: 'app-kereses',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AttractionCardComponent
  ],
  template: `
    <div class="container">
      <h2>Keresés</h2>
      <form [formGroup]="filterForm" class="filter-form">
        <mat-form-field appearance="outline" class="filter-field">
          <mat-label>Város</mat-label>
          <mat-select formControlName="city">
            <mat-option value="">Összes város</mat-option>
            <mat-option *ngFor="let location of locations" [value]="location.id">
              {{ location.name }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="filter-field">
          <mat-label>Esemény neve</mat-label>
          <input matInput formControlName="eventName" placeholder="Pl. Balatoni Borfesztivál">
        </mat-form-field>
      </form>

      <div class="card-container">
        <app-attraction-card
          *ngFor="let attraction of filteredAttractions"
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
      .filter-form {
        display: flex;
        gap: 16px;
        justify-content: center;
        margin-bottom: 24px;
      }
      .filter-field {
        width: 200px;
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
export class KeresesComponent implements OnInit {
  filterForm: FormGroup;
  locations: Location[] = locations;
  allAttractions: Attraction[] = attractions;
  filteredAttractions: Attraction[] = [];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      city: [''],
      eventName: ['']
    });
  }

  ngOnInit(): void {
    this.filteredAttractions = [...this.allAttractions];
    this.filterForm.valueChanges.subscribe(filters => {
      this.applyFilters(filters);
    });
  }

  applyFilters(filters: { city: string, eventName: string }): void {
    this.filteredAttractions = this.allAttractions.filter(attraction => {
      // Város szűrés
      const matchesCity = !filters.city || attraction.locationId === parseInt(filters.city, 10);

      // Esemény szűrés
      const matchesEvent = !filters.eventName || attraction.events.some(event =>
        event.name.toLowerCase().includes(filters.eventName.toLowerCase())
      );

      return matchesCity && matchesEvent;
    });
  }

  onEventsToggled(event: { attractionId: number, isOpen: boolean }): void {
    const attraction = this.allAttractions.find(attr => attr.id === event.attractionId);
    console.log(`Események ${event.isOpen ? 'lenyitva' : 'bezárva'} a következő látnivalónál: ${attraction?.name}`);
  }
}